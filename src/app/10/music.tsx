"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FastAverageColor } from "fast-average-color";
import Image from "next/image";
const scaledValue = (value: number) =>
	Math.max((value / 100) * 20, 5);

const fac = new FastAverageColor();
const generateRandomValues = (
	numBars: number,
) => {
	return Array.from({ length: numBars }, () =>
		scaledValue(Math.random() * 100),
	);
};
export function Music({
	view,
}: {
	view: "music" | "idle";
}) {
	const [color, setColor] = useState("#E2E8F0");
	const [frequencies, setFrequencies] = useState<
		number[]
	>(generateRandomValues(6));

	const getColor = async (
		img: HTMLImageElement,
	) => {
		try {
			const c = await fac.getColorAsync(img, {
				mode: "precision",
			});
			console.log(c);
			setColor(c.hex);
		} catch (error) {
			console.log(error);
			setColor("#E2E8F0");
		}
	};
	console.log(color);
	useEffect(() => {
		const intervalId = setInterval(() => {
			setFrequencies(generateRandomValues(6));
		}, 100);

		return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, []);
	return (
		<motion.div
			className="relative flex h-7 items-center justify-between px-2.5"
			initial={{ width: 128 }}
			animate={{ width: 128 }}
			transition={{ type: "spring", bounce: 0.5 }}
		>
			<Image
				src={"/Liveincookcountyjail.jpg"}
				alt="BB King"
				width={19.75}
				height={19.75}
				priority
				onLoadingComplete={(img) => getColor(img)}
				className="rounded-sm"
			/>
			<div className="ml-auto flex items-center">
				{frequencies.map((value, index) => (
					<motion.div
						layout
						className="mx-[1px] w-[1px] rounded-md"
						key={`${index}-${value}`}
						style={{
							backgroundColor: color,
						}}
						initial={{
							width: 2,
							height: value,
							scaleY: 0.75,
						}}
						transition={{
							duration: 0.1,
							type: "spring",
							bounce: 0.6,
						}}
					/>
				))}
			</div>
		</motion.div>
	);
}
