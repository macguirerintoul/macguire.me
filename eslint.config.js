import { defineConfig } from "eslint/config";
export default defineConfig([
	{
		extends: ["next"],
		eslintPluginPrettierRecommended,
	},
]);
