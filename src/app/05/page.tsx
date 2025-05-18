"use client";
import { cn } from "@/_lib/utils";
import {
	motion,
	AnimatePresence,
} from "motion/react";
import { useMemo, useState } from "react";

const TwoStepPopover = () => {
	const [currentStep, setCurrentStep] =
		useState(0);
	const [direction, setDirection] = useState(0);
	const [open, setOpen] = useState(false);
	const content = useMemo(() => {
		switch (currentStep) {
			case 0:
				return (
					<>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							onClick={(e) => {
								setCurrentStep(1);
								setDirection(1);
								e.stopPropagation();
							}}
							className="mb-2 flex items-center gap-2 rounded-sm p-1 text-xs hover:bg-stone-100"
						>
							<div className="flex items-center gap-1.5">
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
									className="lucide lucide-circle-check fill-gray-400 stroke-gray-400"
								>
									<title>svg</title>
									<circle
										cx="12"
										cy="12"
										r="10"
									/>
									<path
										className="!stroke-white"
										d="m9 12 2 2 4-4"
									/>
								</svg>
								<p className="text-gray-800">
									Approve Changes
								</p>
							</div>
							<p className="ml-auto text-gray-400">
								Send Review
							</p>
						</div>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							onClick={(e) => {
								setCurrentStep(2);
								setDirection(1);
								e.stopPropagation();
							}}
							className="flex items-center gap-2 rounded-sm p-1 text-xs hover:bg-stone-100"
						>
							<div className="flex items-center gap-1.5">
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
									className="lucide lucide-message-square-text fill-gray-400 stroke-gray-400"
								>
									<title>svg</title>
									<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
									<path
										className="!stroke-white"
										d="M13 8H7"
									/>
									<path
										className="stroke-white"
										d="M17 12H7"
									/>
								</svg>
								<p className="text-gray-800">
									Add Comment
								</p>
							</div>
							<p className="ml-auto text-gray-400">
								Reply Thread
							</p>
						</div>
					</>
				);
			case 1:
				return (
					<div>
						<div className="-mt-2 flex items-center">
							<h2 className="text-sm tracking-tight">
								Approve Changes
							</h2>
							<span className="ml-auto rounded-lg bg-teal-50 p-1 text-teal-600 text-xs">
								by @osa
							</span>
						</div>
						<div className="mt-3 flex flex-col items-start justify-center gap-2 rounded-md bg-gray-100 p-2">
							<div className="flex items-center gap-2">
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
									className="lucide lucide-heading-1"
								>
									<title>svg</title>
									<path d="M4 12h8" />
									<path d="M4 18V6" />
									<path d="M12 18V6" />
									<path d="m17 12 3-2v8" />
								</svg>
								<span className="text-xs">
									New Title Added
								</span>
							</div>
							<p className="text-xs">
								&ldquo;Osa is a product
								engineer.&rdquo;
							</p>
						</div>
						<div className="mt-3 flex w-full gap-1">
							<button
								type="button"
								onClick={(e) => {
									setCurrentStep(0);
									setDirection(-1);
									e.stopPropagation();
								}}
								className="w-1/2 rounded-md border border-black/20 bg-white px-1.5 py-1 font-normal text-black text-xs"
							>
								Back
							</button>
							<button
								type="button"
								onClick={(e) => {
									setOpen(false);
									e.stopPropagation();
								}}
								className="w-1/2 rounded-md bg-black px-1.5 py-1 text-white text-xs"
							>
								Approve
							</button>
						</div>
					</div>
				);
			case 2:
				return (
					<div>
						<div className="-mt-2 flex items-center">
							<h2 className="text-sm tracking-tight">
								Add Comment
							</h2>
							<span className="ml-auto rounded-lg bg-teal-50 p-1 text-teal-600 text-xs">
								Create Thread
							</span>
						</div>
						<div className="mt-3 flex h-14 flex-col items-start justify-center gap-2 rounded-md bg-gray-100 p-2" />
						<div className="mt-3 flex w-full gap-1">
							<button
								type="button"
								onClick={(e) => {
									setCurrentStep(0);
									setDirection(-1);
									e.stopPropagation();
								}}
								className="w-1/2 rounded-md border border-black/20 bg-white px-1.5 py-1 font-normal text-black text-xs"
							>
								Back
							</button>
							<button
								type="button"
								onClick={(e) => {
									setOpen(false);
									e.stopPropagation();
								}}
								className="w-1/2 rounded-md bg-black px-1.5 py-1 text-white text-xs"
							>
								Submit
							</button>
						</div>
					</div>
				);
			default:
				null;
		}
	}, [currentStep]);
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			onClick={() => {
				setOpen(false);
				setCurrentStep(0);
			}}
			className="flex h-screen flex-col items-center justify-center gap-4"
		>
			<button
				type="button"
				onClick={(e) => {
					setOpen(!open);
					setCurrentStep(0);
					e.stopPropagation();
				}}
				className="relative rounded-md border border-black/20 bg-white p-1.5"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className={cn(
						"lucide lucide-inbox scale-[0.8] text-gray-500 transition-all delay-[0.4] hover:scale-90 hover:text-black",
						open && "scale-90 text-black",
					)}
				>
					<title>svg</title>
					<polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
					<path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
				</svg>
				<AnimatePresence>
					{open ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{
								opacity: 1,
								height:
									currentStep !== 0 ? 144 : 80,
							}}
							exit={{ opacity: 0 }}
							transition={{
								type: "spring",
								duration: 0.6,
								bounce: 0.1,
							}}
							className={cn(
								"fixed top-[36.5vh] left-[39%] h-20 w-72 overflow-hidden rounded-md bg-white p-4 shadow-black/30 shadow-lg",
								currentStep !== 0 &&
									"top-[28.5vh]",
							)}
						>
							<AnimatePresence
								mode="popLayout"
								initial={false}
							>
								<motion.div
									key={currentStep}
									variants={variants}
									initial="initial"
									animate="active"
									exit="exit"
									custom={direction}
									layout
									transition={{
										duration: 0.2,
										type: "spring",
										bounce: 0,
									}}
								>
									{content}
								</motion.div>
							</AnimatePresence>
						</motion.div>
					) : null}
				</AnimatePresence>
			</button>
		</div>
	);
};
const variants = {
	initial: (direction: number) => {
		return {
			x: `${110 * direction}%`,
			opacity: 0,
		};
	},
	active: { x: "0%", opacity: 1 },
	exit: (direction: number) => {
		return {
			x: `${-110 * direction}%`,
			opacity: 0,
			delay: 0,
		};
	},
};
export default TwoStepPopover;
