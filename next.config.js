const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
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
