// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	turbopack: {
		// to suppress turbopack not configured warning
	},
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
