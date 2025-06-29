import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [new URL("https://admin.motorold.cc/**")],
	},
}

export default nextConfig
