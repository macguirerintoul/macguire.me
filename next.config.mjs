import withPlaiceholder from "@plaiceholder/next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

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

export default bundleAnalyzer(withPlaiceholder(nextConfig));
