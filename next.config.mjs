// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				// Last.fm album covers
				hostname: "lastfm.freetls.fastly.net",
			},
			{
				protocol: "https",
				// Last.fm album covers
				hostname: "coverartarchive.org",
			},
		],
	},
};

export default withPlaiceholder(nextConfig);
