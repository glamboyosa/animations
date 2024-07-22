"use client";
import { cn } from "@/_lib/utils";
import {
	AnimatePresence,
	MotionConfig,
	motion,
} from "framer-motion";
import { useState } from "react";
const variants = {
	exit: {
		y: 40,
		filter: "blur(2px)",
		scale: 0.9,
		opacity: 0,
	},
};
const Six = () => {
	const [status, setStatus] = useState<
		"default" | "sending" | "transfered"
	>("default");
	const calculateHandler = () => {
		setStatus("sending");
		setTimeout(() => {
			setStatus("transfered");
		}, 2000);
		setTimeout(() => {
			setStatus("default");
		}, 3000);
	};
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex h-1/2 w-1/3 flex-col items-center justify-center gap-24 rounded-md border border-stone-300 bg-stone-100">
				<MotionConfig
					transition={{
						type: "spring",
						duration: 0.3,
						bounce: 0,
					}}
				>
					<div className="relative flex w-full flex-col items-center justify-center text-sm">
						<span>checkout the GitHub repo</span>
						<motion.div className="absolute top-0 z-20 flex h-40 w-3/4 flex-col items-center justify-center gap-2 rounded-md border border-black/10 bg-white p-3.5 shadow-sm">
							<h2 className="font-bold text-lg">
								Transfered
							</h2>
							<span className="flex w-fit items-center gap-1 rounded-lg bg-green-200 px-2 py-0.5 text-green-600">
								<svg
									width="15"
									height="15"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>svg</title>
									<path
										d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
										fill="currentColor"
										fill-rule="evenodd"
										clip-rule="evenodd"
									/>
								</svg>
								<p>You are $6000M richer</p>
							</span>
						</motion.div>
						<AnimatePresence>
							{status === "sending" ||
							status === "default" ? (
								<motion.div
									variants={variants}
									exit="exit"
									className="absolute top-1 z-30 flex h-40 w-3/4 flex-col items-center justify-center gap-2 rounded-md border border-black/10 bg-white p-3.5 shadow-sm"
								>
									<h2 className="font-bold text-lg">
										Check your bank
									</h2>
									<span className="flex w-fit items-center gap-1 rounded-lg bg-blue-50 px-2 py-0.5 text-blue-500">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="15"
											height="15"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											className="animate-spin"
										>
											<title>svg</title>
											<path d="M21 12a9 9 0 1 1-6.219-8.56" />
										</svg>
										<p>Sending</p>
									</span>
								</motion.div>
							) : null}
						</AnimatePresence>
						<AnimatePresence>
							{status === "default" ? (
								<motion.div
									variants={variants}
									exit="exit"
									className="absolute top-2.5 z-50 flex h-40 w-3/4 flex-col gap-8 rounded-md border border-black/10 bg-white p-3.5 shadow-sm"
								>
									<div className="flex items-center">
										<span className="text-gray-700">
											ASK
										</span>
										<span className="ml-auto text-gray-300">
											We don&apos;t ask anything
										</span>
									</div>
									<p className="text-center font-extrabold text-2xl">
										$6000M
									</p>
								</motion.div>
							) : null}
						</AnimatePresence>
					</div>
				</MotionConfig>
				<button
					type="button"
					onClick={calculateHandler}
					disabled={status !== "default"}
					className={cn(
						"mt-20 w-1/3 rounded-md bg-black p-3 text-sm text-white hover:bg-black/80 hover:text-white/70 disabled:bg-black/80 disabled:text-white/80",
					)}
				>
					Calculate
				</button>
			</div>
		</div>
	);
};

export default Six;
