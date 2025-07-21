import { getPlaiceholder } from "plaiceholder";

export async function getMusicItems(
	type: "albums" | "artists" = "albums",
	time: "week" | "month" | "year" | "all" = "month",
) {
	let period;
	if (time === "week") {
		period = "7day";
	} else if (time === "month") {
		period = "1month";
	} else if (time === "year") {
		period = "12month";
	} else if (time === "all") {
		period = "overall";
	} else {
		// Default to 1 month if no valid time is provided
		period = "1month";
	}

	const fallbackURL =
		"https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg";
	let fallbackBlurDataURL: string;

	try {
		const buffer = await fetch(fallbackURL).then(async (res) =>
			Buffer.from(await res.arrayBuffer()),
		);
		const { base64 } = await getPlaiceholder(buffer);
		fallbackBlurDataURL = base64;
	} catch (e) {
		// If the fallback image itself fails to load, use a minimal placeholder
		fallbackBlurDataURL =
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
	}

	if (type === "albums") {
		const albumResponse = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=macguirerintoul&api_key=${process.env.LASTFM_API_KEY}&limit=5&period=${period}&format=json`,
		).then((response) => response.json());

		const albums = await Promise.all(
			albumResponse.topalbums.album.map(
				async (album: {
					name: string;
					artist: { name: string };
					mbid: string;
					url: string;
				}) => {
					try {
						const albumArtURL = `https://coverartarchive.org/release/${album.mbid}/front`;
						const response = await fetch(albumArtURL);
						if (!response.ok) {
							throw new Error("Cover art not found");
						}
						const buffer = Buffer.from(await response.arrayBuffer());
						const { base64 } = await getPlaiceholder(buffer);
						return {
							title: album.name,
							subtitle: album.artist.name,
							imageUrl: albumArtURL,
							url: album.url,
							blurDataURL: base64,
						};
					} catch (error) {
						return {
							title: album.name,
							subtitle: album.artist.name,
							imageUrl: fallbackURL,
							url: album.url,
							blurDataURL: fallbackBlurDataURL,
						};
					}
				},
			),
		);

		return albums; // Filter out any potential null/undefined entries
	} else if (type === "artists") {
		const artistsResponse = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=macguirerintoul&api_key=${process.env.LASTFM_API_KEY}&limit=5&period=${period}&format=json`,
		).then((response) => response.json());

		const artists = await Promise.all(
			artistsResponse.topartists.artist.map(
				async (artist: {
					name: string;
					url: string;
					image: { "#text": string; size: string }[];
				}) => {
					try {
						const largeImage =
							artist.image.find((img) => img.size === "extralarge") ||
							artist.image[artist.image.length - 1];
						const artistImageURL = largeImage?.["#text"];

						if (!artistImageURL) {
							throw new Error("Artist image not found in API response");
						}

						const buffer = await fetch(artistImageURL).then(async (res) =>
							Buffer.from(await res.arrayBuffer()),
						);

						const { base64 } = await getPlaiceholder(buffer);
						return {
							title: artist.name,
							imageUrl: artistImageURL,
							url: artist.url,
							blurDataURL: base64,
						};
					} catch (error) {
						return {
							title: artist.name,
							imageUrl: fallbackURL,
							url: artist.url,
							blurDataURL: fallbackBlurDataURL,
						};
					}
				},
			),
		);

		return artists.filter(Boolean);
	} else {
		return [];
	}
}
