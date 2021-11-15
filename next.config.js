const withMDX = require("@next/mdx")({
	webpack(config) {
		config.module.rules.push({ test: /\.yml$/, use: "raw-loader" });
		return config;
	},
});
module.exports = {
	withMDX,
};
