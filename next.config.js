// TODO i think this can be deleted since i'm not creating direct mdx pages

const withMDX = require("@next/mdx")({
	extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	reactStrictMode: true,
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);
