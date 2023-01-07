const withMDX = require("@next/mdx")({
	extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	// Optionally, add any other Next.js config below
	reactStrictMode: true,
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);
