"use client";

import { useMemo, useState } from "react";
import { Music } from "./music";
import { motion } from "motion/react";

export default function DynamicIsland() {
	const [view, setView] = useState<
		"music" | "idle"
	>("idle");

	const content = useMemo(() => {
		switch (view) {
			case "music":
				return <Music view={view} />;
			case "idle":
				return <div className="h-7" />;
		}
	}, [view]);

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<div className="flex h-[160px] justify-center">
				<motion.div
					layout
					style={{ borderRadius: 9999 }}
					className="h-fit min-w-[100px] overflow-hidden bg-black"
				>
					{content}
				</motion.div>
			</div>
			<div className="flex justify-center gap-4">
				<button
					type="button"
					className="h-10 w-32 rounded-full bg-white px-2.5 py-1.5 font-medium text-gray-900 text-sm shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
					onClick={() => {
						setView("idle");
					}}
				>
					Idle
				</button>
				<button
					type="button"
					className="h-10 w-32 rounded-full bg-white px-2.5 py-1.5 font-medium text-gray-900 text-sm shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
					onClick={() => {
						setView("music");
					}}
				>
					Music
				</button>
			</div>
		</div>
	);
}
