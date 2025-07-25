import { getPlaiceholder } from "plaiceholder";

const fallbackAlbumArtURL =
	"https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg";

async function getBlurData(url?: string | null) {
	if (!url) {
		return null;
	}
	try {
		// Use Next.js fetch caching. Cache images for a day.
		const res = await fetch(url, { next: { revalidate: 86400 } });
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
		body: "grant_type=client_credentials",
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
	type: "albums" | "artists" = "albums",
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

	if (type === "albums") {
		const albumResponse = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=macguirerintoul&api_key=${process.env.LASTFM_API_KEY}&limit=5&period=${period}&format=json`,
			// Cache Last.fm album data for 1 day
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
					const albumArtURL = `https://coverartarchive.org/release/${album.mbid}/front`;
					const blurData = await getBlurData(albumArtURL);

					return {
						title: album.name,
						subtitle: album.artist.name,
						imageUrl: blurData ? albumArtURL : fallbackAlbumArtURL,
						blurDataURL: blurData?.base64 || fallbackBlurData?.base64,
						url: album.url,
					};
				},
			),
		);

		return albums;
	}

	if (type === "artists") {
		const lastFmResponse = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=macguirerintoul&api_key=${process.env.LASTFM_API_KEY}&limit=5&period=${period}&format=json`,
			// Cache Last.fm artist data for 1 day
			{ next: { revalidate: 86400 } },
		);
		const lastFmData = await lastFmResponse.json();
		const spotifyAccessToken = await getSpotifyAccessToken();

		const artists = await Promise.all(
			lastFmData.topartists.artist.map(
				async (artist: { name: string; url: string }) => {
					const spotifyResponse = await fetch(
						`https://api.spotify.com/v1/search?q=${artist.name}&type=artist&limit=1`,
						{
							headers: {
								Authorization: `Bearer ${spotifyAccessToken}`,
							},
							// Cache Spotify artist search results for a day
							next: { revalidate: 86400 },
						},
					);
					const spotifyData = await spotifyResponse.json();
					const artistImageURL = spotifyData.artists.items[0]?.images[0]?.url;

					const blurData = await getBlurData(artistImageURL);

					return {
						title: artist.name,
						imageUrl: artistImageURL || fallbackAlbumArtURL,
						url: artist.url,
						blurDataURL: blurData?.base64 || fallbackBlurData?.base64,
					};
				},
			),
		);

		return artists;
	}

	return [];
}
