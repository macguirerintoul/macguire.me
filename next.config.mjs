// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		remotePatterns: [
			new URL("https://i.scdn.co/**"),
			new URL("https://lastfm.freetls.fastly.net/**"),
			new URL("http://coverartarchive.org/**"),
			new URL("https://coverartarchive.org/**"),
		],
	},
};

export default withPlaiceholder(nextConfig);
