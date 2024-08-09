"use client";

import { useMemo, useState } from "react";
import { Timer } from "./timer";

export default function DynamicIsland() {
	const [view, setView] = useState<
		"timer" | "idle"
	>("idle");

	const content = useMemo(() => {
		switch (view) {
			case "timer":
				return <Timer />;
			case "idle":
				return <div className="h-7" />;
		}
	}, [view]);

	return (
		<div>
			<div className="flex h-[160px] justify-center">
				<div className="h-fit min-w-[100px] overflow-hidden rounded-full bg-black">
					{content}
				</div>
			</div>
		</div>
	);
}
