const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
import { defineConfig } from "eslint/config";
export default defineConfig([
	{
		extends: ["next"],
		eslintPluginPrettierRecommended,
	},
]);
