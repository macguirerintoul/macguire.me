import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const albumResponse = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=macguirerintoul&api_key=${process.env.LASTFM_API_KEY}&limit=5&period=1month&format=json`
		)
			.then((response) => response.json())
			.then((data) => {
				return data;
			});

		const albums = await Promise.all(
			albumResponse.topalbums.album.map(async (album) => {
				return {
					title: album.name,
					artist: album.artist.name,
					image: album.image[3]["#text"],
					url: album.url,
				};
			})
		);

		res.setHeader("Cache-Control", "s-maxage=86400");
		res.json(albums);
	} catch (error) {
		console.error(error);
	}
}
