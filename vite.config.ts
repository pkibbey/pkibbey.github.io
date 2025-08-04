import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	base: "/",
	build: {
		outDir: "dist",
		assetsDir: "assets",
		sourcemap: true,
		minify: true,
	},
});
