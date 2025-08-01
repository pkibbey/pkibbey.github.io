/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: false,
	output: "export",
	images: {
		unoptimized: true,
	},
	basePath: "",
	assetPrefix: "",
};

module.exports = nextConfig;
