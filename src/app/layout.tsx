import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Animations by Osa",
	description:
		"UI microinteractions and animation recreations — motion, timing, and craft.",
};
export const experimental_ppr = true;
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
