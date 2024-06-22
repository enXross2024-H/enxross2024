/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.html$/i,
			use: [
				{
					loader: "html-loader",
					options: {
						minimize: true,
					},
				},
			],
		});
		return config;
	},
};

export default nextConfig;
