import "server-only";
import { getPlaiceholder } from "plaiceholder";
import {
	LastFMUserGetTopArtistsResponse,
	LastFMUserGetTopAlbumsResponse,
} from "lastfm-ts-api";

const SPOTIFY_API_URL = "https://api.spotify.com/v1/";
const LASTFM_API_URL = "https://ws.audioscrobbler.com/2.0/?";
const LASTFM_USERNAME = "macguirerintoul";
const fallbackAlbumArtURL =
	"https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg";

async function getBlurData(url?: string | null) {
	if (!url) {
		return null;
	}
	try {
		const res = await fetch(url, { next: { revalidate: 604800 } });
		if (!res.ok) {
			return null;
		}
		const buffer = await res.arrayBuffer();
		const { base64 } = await getPlaiceholder(Buffer.from(buffer));
		return { base64, buffer };
	} catch (err) {
		return null;
	}
}

async function getSpotifyAccessToken() {
	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " +
				Buffer.from(
					`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
				).toString("base64"),
		},
		body: new URLSearchParams({ grant_type: "client_credentials" }),
		// Use Next.js's fetch caching. Spotify tokens expire in 1 hour (3600s).
		// Cache for 50 minutes (3000s) to be safe.
		next: { revalidate: 3000 },
	});

	if (!response.ok) {
		throw new Error("Failed to fetch Spotify access token");
	}

	const data = await response.json();
	return data.access_token;
}

async function getCoverArtArchiveUrl(
	mbid: string,
	type: "release" | "release-group" = "release",
): Promise<string | null> {
	try {
		const res = await fetch(`https://coverartarchive.org/${type}/${mbid}`, {
			next: { revalidate: 604800 },
		});
		if (!res.ok) {
			return null;
		}
		const data = await res.json();
		return (
			data.images?.[0]?.thumbnails?.["250"] ||
			data.images?.[0]?.thumbnails?.small ||
			data.images?.[0]?.image ||
			null
		);
	} catch {
		return null;
	}
}

async function getReleaseGroupArt(releaseMbid: string): Promise<string | null> {
	// 1. In case the mbid itself is already a release-group MBID
	let art = await getCoverArtArchiveUrl(releaseMbid, "release-group");
	if (art) {
		return art;
	}

	// 2. Query MusicBrainz to resolve the release's release-group ID
	try {
		const res = await fetch(
			`https://musicbrainz.org/ws/2/release/${releaseMbid}?inc=release-groups&fmt=json`,
			{
				headers: {
					"User-Agent": "macguire.me/0.1.0 ( https://macguire.me )",
				},
				next: { revalidate: 604800 },
			},
		);
		if (!res.ok) {
			return null;
		}
		const data = await res.json();
		const releaseGroupId = data["release-group"]?.id;
		if (releaseGroupId) {
			return await getCoverArtArchiveUrl(releaseGroupId, "release-group");
		}
	} catch {
		return null;
	}
	return null;
}

async function searchMusicBrainzRelease(
	albumName: string,
	artistName: string,
): Promise<{ releaseMbid?: string; coverArtUrl?: string } | null> {
	try {
		// Clean Lucene special characters to avoid query syntax errors
		const cleanAlbum = albumName
			.replace(/[+\-&|!(){}\[\]^"~*?:\\\/]/g, " ")
			.replace(/\s+/g, " ")
			.trim();
		const cleanArtist = artistName
			.replace(/[+\-&|!(){}\[\]^"~*?:\\\/]/g, " ")
			.replace(/\s+/g, " ")
			.trim();

		const query = `release:"${cleanAlbum}" AND artist:"${cleanArtist}"`;
		const res = await fetch(
			`https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(
				query,
			)}&fmt=json&limit=5`,
			{
				headers: {
					"User-Agent": "macguire.me/0.1.0 ( https://macguire.me )",
				},
				next: { revalidate: 604800 },
			},
		);

		if (!res.ok) {
			return null;
		}

		const data = await res.json();
		const releases = data.releases;
		if (!releases || releases.length === 0) {
			return null;
		}

		// First, prefer a release that explicitly has front cover art in CAA
		const releaseWithArt = releases.find(
			(r: { "cover-art-archive"?: { front?: boolean } }) =>
				r["cover-art-archive"]?.front,
		);

		if (releaseWithArt) {
			const coverArtUrl = await getCoverArtArchiveUrl(
				releaseWithArt.id,
				"release",
			);
			return {
				releaseMbid: releaseWithArt.id,
				coverArtUrl: coverArtUrl || undefined,
			};
		}

		// Otherwise, try the highest-scoring release
		const topRelease = releases[0];
		const releaseMbid = topRelease.id;
		let coverArtUrl = await getCoverArtArchiveUrl(releaseMbid, "release");

		// If the specific release has no artwork, try its release-group
		const releaseGroupId = topRelease["release-group"]?.id;
		if (!coverArtUrl && releaseGroupId) {
			coverArtUrl = await getCoverArtArchiveUrl(
				releaseGroupId,
				"release-group",
			);
		}

		return {
			releaseMbid,
			coverArtUrl: coverArtUrl || undefined,
		};
	} catch {
		return null;
	}
}

async function getSpotifyAlbumArt(
	albumName: string,
	artistName: string,
): Promise<string | null> {
	try {
		const token = await getSpotifyAccessToken();
		const spotifyResponse = await fetch(
			SPOTIFY_API_URL +
				"search?" +
				new URLSearchParams({
					q: `album:${albumName} artist:${artistName}`,
					type: "album",
					limit: "1",
				}),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				next: { revalidate: 604800 },
			},
		);
		if (!spotifyResponse.ok) {
			return null;
		}
		const data = await spotifyResponse.json();
		return data.albums?.items?.[0]?.images?.[0]?.url || null;
	} catch {
		return null;
	}
}

export async function getMusicItems(
	itemType: string = "album",
	time: string = "month",
) {
	let period;
	switch (time) {
		case "week":
			period = "7day";
			break;
		case "month":
			period = "1month";
			break;
		case "year":
			period = "12month";
			break;
		case "all":
			period = "overall";
			break;
		default:
			period = "1month";
	}

	const fallbackBlurData = await getBlurData(fallbackAlbumArtURL);

	if (itemType === "album") {
		let albumResponse: LastFMUserGetTopAlbumsResponse = await fetch(
			LASTFM_API_URL +
				new URLSearchParams({
					method: "user.gettopalbums",
					user: LASTFM_USERNAME,
					api_key: process.env.LASTFM_API_KEY!,
					limit: "5",
					period: period,
					format: "json",
				}),
			{ next: { revalidate: 86400 } },
		).then((response) => response.json());

		const albums = await Promise.all(
			albumResponse.topalbums.album.map(
				async (album: {
					name: string;
					artist: { name: string };
					mbid: string;
					url: string;
				}) => {
					let mbid = album.mbid;
					let albumArtURL: string | null | undefined;

					// 1. MBID art (Cover Art Archive release)
					if (mbid) {
						albumArtURL = await getCoverArtArchiveUrl(mbid, "release");
					}

					// 2. Release group art
					if (!albumArtURL && mbid) {
						albumArtURL = await getReleaseGroupArt(mbid);
					}

					// 3. MusicBrainz search
					if (!albumArtURL) {
						const mbResult = await searchMusicBrainzRelease(
							album.name,
							album.artist.name,
						);
						if (mbResult) {
							if (!mbid && mbResult.releaseMbid) {
								mbid = mbResult.releaseMbid;
							}
							if (mbResult.coverArtUrl) {
								albumArtURL = mbResult.coverArtUrl;
							}
						}
					}

					// 4. Spotify
					if (!albumArtURL) {
						albumArtURL = await getSpotifyAlbumArt(
							album.name,
							album.artist.name,
						);
					}

					// 5. Placeholder
					const blurData = albumArtURL
						? await getBlurData(albumArtURL)
						: null;

					return {
						title: album.name,
						subtitle: album.artist.name,
						mbid: mbid || "",
						imageUrl: blurData ? albumArtURL! : fallbackAlbumArtURL,
						blurDataURL: blurData?.base64 || fallbackBlurData?.base64,
						url: album.url,
					};
				},
			),
		);

		return albums;
	}

	if (itemType === "artist") {
		let lastFmResponse: LastFMUserGetTopArtistsResponse = await fetch(
			LASTFM_API_URL +
				new URLSearchParams({
					method: "user.gettopartists",
					user: LASTFM_USERNAME,
					api_key: process.env.LASTFM_API_KEY!,
					limit: "5",
					period: period,
					format: "json",
				}),
			{ next: { revalidate: 86400 } },
		).then((response) => response.json());

		const spotifyAccessToken = await getSpotifyAccessToken();

		const artists = await Promise.all(
			lastFmResponse.topartists.artist.map(
				async (artist: { name: string; url: string; mbid: string }) => {
					let spotifyData;
					try {
						const spotifyResponse = await fetch(
							SPOTIFY_API_URL +
								"search?" +
								new URLSearchParams({
									q: artist.name,
									type: "artist",
									limit: "1",
								}),
							{
								headers: {
									Authorization: `Bearer ${spotifyAccessToken}`,
								},
								next: { revalidate: 604800 },
							},
						);
						spotifyData = await spotifyResponse.json();
					} catch (error) {
						console.error("Failed to fetch Spotify artist data:", error);
						spotifyData = { artists: { items: [] } };
					}
					const artistImageURL = spotifyData.artists?.items[0]?.images[0]?.url;

					const blurData = await getBlurData(artistImageURL);

					return {
						title: artist.name,
						imageUrl: artistImageURL || fallbackAlbumArtURL,
						url: artist.url,
						mbid: artist.mbid,
						blurDataURL: blurData?.base64 || fallbackBlurData?.base64,
					};
				},
			),
		);

		return artists;
	}
	return [];
}
