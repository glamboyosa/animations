import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Animations by Osa",
	description: "Generated by create next app",
};
export const experimental_ppr = true;
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<link
				rel="preload"
				href="/andrea-davis-IWfe63thJxk-unsplash.jpg"
				as="image"
			/>
			<link
				rel="preload"
				href="/karsten-winegeart-sStahKEhT9w-unsplash.jpg"
				as="image"
			/>
			<link
				rel="preload"
				href="/meritt-thomas-_YxDGcDm4Hs-unsplash.jpg"
				as="image"
			/>
			<link
				rel="preload"
				href="/roberto-nickson-6FZf3yzuodE-unsplash.jpg"
				as="image"
			/>
			<link
				rel="preload"
				href="/stephen-wheeler-hBh9JbyeCtg-unsplash.jpg"
				as="image"
			/>
			<body className={inter.className}>
				{children}
			</body>
		</html>
	);
}
