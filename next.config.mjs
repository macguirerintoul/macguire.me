import withPlaiceholder from "@plaiceholder/next";
import { withPlausibleProxy } from "next-plausible";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
			config.resolve.fallback = {
				fs: false,
			};
		}
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				// Last.fm album covers
				hostname: "lastfm.freetls.fastly.net",
			},
		],
	},
};

export default withPlausibleProxy()(withPlaiceholder(nextConfig));
