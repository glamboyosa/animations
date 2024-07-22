"use client";
import {
	motion,
	AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
const images = [
	"andrea-davis-IWfe63thJxk-unsplash.jpg",
	"karsten-winegeart-sStahKEhT9w-unsplash.jpg",
	"meritt-thomas-_YxDGcDm4Hs-unsplash.jpg",
	"roberto-nickson-6FZf3yzuodE-unsplash.jpg",
	"stephen-wheeler-hBh9JbyeCtg-unsplash.jpg",
];
const rotationDegrees = [10, -20, -5, 5, 2];
const variants = {
	initial: () => ({
		opacity: 0,
		scale: 0,
	}),
	animate: (index: number) => ({
		opacity: 1,
		scale: 1,
		rotate: rotationDegrees[index],
	}),
	transition: (index: number) => ({
		delay: index * 0.15,
		type: "spring",
		bounce: 0.6,
		bounceDamping: 10,
		bounceStiffness: 40,
		duration: 0.5,
	}),
};
const AirBnbHomesAnimation = () => {
	const [play, setPlaying] = useState<
		"not-playing" | "playing"
	>("playing");
	useEffect(() => {
		const timer = setTimeout(
			() => setPlaying("not-playing"),
			2000,
		);
		return () => clearTimeout(timer);
	}, []);
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<div className="grid size-80 auto-cols-max grid-flow-col place-content-center rounded-lg bg-stone-200 p-3 shadow-md shadow-zinc-300">
				<AnimatePresence>
					{play === "playing"
						? images.map((img, idx) => (
								<motion.img
									className="h-12 w-12 overflow-hidden rounded-md border-2 border-white"
									key={img}
									style={{
										zIndex: idx * 10,
										translate: idx * -5,
									}}
									width={32}
									height={32}
									initial="initial"
									animate="animate"
									variants={variants}
									custom={idx}
									transition={variants.transition(
										idx,
									)}
									loading="eager"
									fetchPriority="auto"
									alt=""
									src={`/${img}`}
								/>
							))
						: images.map((img, idx) => (
								<Image
									className="h-12 w-12 overflow-hidden rounded-md border-2 border-white"
									key={img}
									style={{
										zIndex: idx * 10,
										translate: idx * -5,
										rotate: `${rotationDegrees[idx]}deg`,
									}}
									width={32}
									height={32}
									loading="eager"
									priority
									alt=""
									src={`/${img}`}
								/>
							))}
				</AnimatePresence>
			</div>
			<button
				type="button"
				onClick={() => {
					setPlaying("playing");
					const timeout = setTimeout(() => {
						setPlaying("not-playing");
						clearTimeout(timeout);
					}, 2000);
				}}
				className="w-72 rounded-md bg-stone-200 p-3 text-black/70 text-sm hover:bg-stone-300"
			>
				{play === "playing" ? "playing" : "play"}
			</button>
		</div>
	);
};
export default AirBnbHomesAnimation;
