import { Album } from "./types";

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
					return {
						title: album.name,
						artist: album.artist.name,
						image: album.image[3]["#text"],
						url: album.url,
					};
				} catch (error) {
					console.error(error);
				}
			}
		)
	);

	return albums;
}
