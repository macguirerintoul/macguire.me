import { getPlaiceholder } from "plaiceholder";

const fallbackAlbumArtURL =
	"https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.jpg";

async function getBlurData(url?: string | null) {
	if (!url) {
		return { base64: "", buffer: null };
	}
	try {
		const res = await fetch(url);
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
						blurDataURL: blurData ? blurData.base64 : fallbackBlurData?.base64,
						url: album.url,
					};
				},
			),
		);

		return albums;
	}

	if (type === "artists") {
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
					const largeImage =
						artist.image.find((img) => img.size === "extralarge") ||
						artist.image[artist.image.length - 1];
					const artistImageURL = largeImage?.["#text"];
					const blurData = await getBlurData(artistImageURL);

					return {
						title: artist.name,
						imageUrl: blurData ? artistImageURL : fallbackAlbumArtURL,
						url: artist.url,
						blurDataURL: blurData ? blurData.base64 : fallbackBlurData?.base64,
					};
				},
			),
		);

		return artists;
	}

	return [];
}
