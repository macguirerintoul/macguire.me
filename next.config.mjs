// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "i.scdn.co" },
			{
				protocol: "https",
				hostname: "lastfm.freetls.fastly.net",
			},
			{
				protocol: "https",
				hostname: "coverartarchive.org",
			},
		],
	},
};

export default withPlaiceholder(nextConfig);
