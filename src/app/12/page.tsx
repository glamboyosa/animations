"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import airpods from "../../../public/airpods.webp";
import iphone from "../../../public/iphone.webp";
import mac from "../../../public/mac.webp";
import watch from "../../../public/watch.webp";

const products = [
	{ src: airpods, alt: "AirPods" },
	{ src: mac, alt: "Mac" },
	{ src: watch, alt: "Watch" },
	{ src: iphone, alt: "iPhone" },
];

const INITIAL_DELAY_MS = 2000;
const CYCLE_MS = 1500;

export default function Page() {
	const reduced = useReducedMotion() ?? false;
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		const advance = () =>
			setCurrentIndex((prev) => (prev + 1) % products.length);
		const timeout = setTimeout(() => {
			interval = setInterval(advance, CYCLE_MS);
		}, INITIAL_DELAY_MS);

		return () => {
			clearTimeout(timeout);
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-rose-200">
			<div className="relative h-64 w-64">
				{/* Every product stays mounted and decoded, so a swap is a pure
				    opacity crossfade with no blank frame between images. */}
				{products.map((product, index) => (
					<motion.div
						key={product.alt}
						initial={false}
						animate={{
							opacity: index === currentIndex ? 1 : 0,
						}}
						transition={{
							duration: reduced ? 0 : 0.3,
							ease: [0.32, 0.72, 0, 1],
						}}
						aria-hidden={index !== currentIndex}
						className="absolute inset-0"
						style={{ willChange: "opacity" }}
					>
						<Image
							src={product.src}
							alt={product.alt}
							fill
							preload
							sizes="256px"
							className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
						/>
					</motion.div>
				))}
			</div>

			<div className="mt-4">
				<svg
					className="h-8 w-8"
					viewBox="0 0 24 24"
					fillRule="evenodd"
					aria-hidden
				>
					<title>Apple</title>
					<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
				</svg>
			</div>
		</div>
	);
}
