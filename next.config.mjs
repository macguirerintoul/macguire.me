import withPlaiceholder from "@plaiceholder/next";

export default withPlaiceholder({
	images: {
		remotePatterns: [
			{
				protocol: "https",
				// Last.fm album covers
				hostname: "lastfm.freetls.fastly.net",
			},
		],
	},
});
