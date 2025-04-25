import { getPlaiceholder } from "plaiceholder";

export async function getAlbums() {
	const albumResponse = await fetch(
		`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=macguirerintoul&api_key=${process.env.LASTFM_API_KEY}&limit=5&period=1month&format=json`
	)
		.then((response) => response.json())
		.then((data) => {
			return data;
		});

	const albums = await Promise.all(
		albumResponse.topalbums.album.map(
			async (album: {
				name: string;
				artist: { name: string };
				image: { "#text": string }[];
				url: string;
			}) => {
				try {
					const albumArtURL =
						album.image[3]["#text"] ||
						"https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg";

					const buffer = await fetch(albumArtURL).then(async (res) =>
						Buffer.from(await res.arrayBuffer())
					);

					const { base64 } = await getPlaiceholder(buffer);
					return {
						title: album.name,
						artist: album.artist.name,
						image: albumArtURL,
						url: album.url,
						blurDataURL: base64,
					};
				} catch (error) {
					console.error(error);
				}
			}
		)
	);

	return albums;
}
