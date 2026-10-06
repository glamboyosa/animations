/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{ protocol: "https", hostname: "unavatar.io" },
			{ protocol: "https", hostname: "image-cdn-ak.spotifycdn.com" },
			{ protocol: "https", hostname: "i.scdn.co" },
			{ protocol: "https", hostname: "pbs.twimg.com" },
			{ protocol: "https", hostname: "i.pravatar.cc" },
		],
	},
};

export default nextConfig;
