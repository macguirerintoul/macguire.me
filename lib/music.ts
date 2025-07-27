import "server-only";
import { getPlaiceholder } from "plaiceholder";
import {
	LastFMUserGetTopArtistsResponse,
	LastFMUserGetTopAlbumsResponse,
} from "lastfm-ts-api";

const SPOTIFY_API_URL = "https://api.spotify.com/v1/";
const LASTFM_API_URL = "https://ws.audioscrobbler.com/2.0/";
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

export async function getMusicItems(
	itemType: "album" | "artist" = "album",
	time: "week" | "month" | "year" | "all" = "month",
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
		const albumResponse: LastFMUserGetTopAlbumsResponse = await fetch(
			LASTFM_API_URL,
			// Cache Last.fm album data for 1 day
			{
				body: new URLSearchParams({
					method: "user.gettopalbums",
					user: LASTFM_USERNAME,
					api_key: process.env.LASTFM_API_KEY!,
					limit: "5",
					period: period,
					format: "json",
				}),
				next: { revalidate: 86400 },
			},
		).then((response) => response.json());

		const albums = await Promise.all(
			albumResponse.topalbums.album.map(
				async (album: {
					name: string;
					artist: { name: string };
					mbid: string;
					url: string;
				}) => {
					let albumArtURL;
					let blurData;

					if (album.mbid) {
						try {
							const res = await fetch(
								`https://coverartarchive.org/release/${album.mbid}`,
								{ next: { revalidate: 604800 } },
							);

							if (res.ok) {
								const albumArtData = await res.json();
								albumArtURL =
									albumArtData.images[0]?.thumbnails["250"] ||
									albumArtData.images[0]?.thumbnails.small;
								blurData = await getBlurData(albumArtURL);
							}
						} catch (error) {
							// Fails if album art is not found, which is fine.
						}
					}

					return {
						title: album.name,
						subtitle: album.artist.name,
						mbid: album.mbid,
						imageUrl: blurData ? albumArtURL : fallbackAlbumArtURL,
						blurDataURL: blurData?.base64 || fallbackBlurData?.base64,
						url: album.url,
					};
				},
			),
		);

		return albums;
	}

	if (itemType === "artist") {
		const lastFmResponse: LastFMUserGetTopArtistsResponse = await fetch(
			LASTFM_API_URL,
			{
				body: new URLSearchParams({
					method: "user.gettopartists",
					user: LASTFM_USERNAME,
					api_key: process.env.LASTFM_API_KEY!,
					limit: "5",
					period: period,
					format: "json",
				}),
				next: { revalidate: 86400 },
			},
		).then((response) => response.json());

		const spotifyAccessToken = await getSpotifyAccessToken();

		const artists = await Promise.all(
			lastFmResponse.topartists.artist.map(
				async (artist: { name: string; url: string; mbid: string }) => {
					const spotifyResponse = await fetch(SPOTIFY_API_URL + "search", {
						body: new URLSearchParams({
							q: artist.name,
							type: "artist",
							limit: "1",
						}),
						headers: {
							Authorization: `Bearer ${spotifyAccessToken}`,
						},
						next: { revalidate: 604800 },
					});
					const spotifyData = await spotifyResponse.json();
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
