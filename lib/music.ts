import { getPlaiceholder } from "plaiceholder";

export interface MusicItem {
	title: string;
	subtitle?: string;
	imageUrl: string;
	url: string;
	blurDataURL: string;
}

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

	if (type === "albums") {
		const albumResponse = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=macguirerintoul&api_key=${process.env.LASTFM_API_KEY}&limit=5&period=${period}&format=json`,
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				return data;
			});

		const albums = await Promise.all(
			albumResponse.topalbums.album.map(
				async (album: {
					name: string;
					artist: { name: string };
					mbid: string;
					url: string;
				}) => {
					try {
						let albumArtURL = `https://coverartarchive.org/release/${album.mbid}/front`;
						const fallbackURL =
							"https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg";

						try {
							const response = await fetch(albumArtURL);
							if (!response.ok) {
								albumArtURL = fallbackURL;
							}
						} catch {
							albumArtURL = fallbackURL;
						}

						const buffer = await fetch(albumArtURL).then(async (res) =>
							Buffer.from(await res.arrayBuffer()),
						);

						const { base64 } = await getPlaiceholder(buffer);
						return {
							title: album.name,
							subtitle: album.artist.name,
							imageUrl: albumArtURL,
							url: album.url,
							blurDataURL: base64,
						};
					} catch (error) {
						console.error(error);
					}
				},
			),
		);

		return albums;
	} else if (type === "artists") {
		const artistsResponse = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=macguirerintoul&api_key=${process.env.LASTFM_API_KEY}&limit=5&period=${period}&format=json`,
		)
			.then((response) => response.json())
			.then((data) => {
				return data;
			});

		const artists = await Promise.all(
			artistsResponse.topartists.artist.map(
				async (artist: { name: string; mbid: string; url: string }) => {
					try {
						const artistImageURL = `https://lastfm.freetls.fastly.net/i/u/300x300/${artist.mbid}.jpg`;
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
						console.error(error);
					}
				},
			),
		);

		return artists;
	} else {
		return [];
	}
}
