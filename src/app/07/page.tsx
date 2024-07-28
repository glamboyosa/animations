"use client";

import { useMemo, useState } from "react";
import { Drawer } from "vaul";
import useMeasure from "react-use-measure";
import {
	motion,
	AnimatePresence,
} from "framer-motion";
import {
	DefaultView,
	Key,
	Phrase,
	RemoveWallet,
} from "./components";
import { CloseIcon } from "./icons";
import { Inter } from "next/font/google";
import { cn } from "@/_lib/utils";
const inter = Inter({
	weight: [
		"200",
		"300",
		"400",
		"500",
		"600",
		"700",
	],
	subsets: [
		"cyrillic",
		"cyrillic-ext",
		"greek",
		"latin",
		"latin-ext",
	],
});
export default function FamilyDrawer() {
	const [isOpen, setIsOpen] = useState(false);
	const [view, setView] = useState("default");
	const [elementRef, bounds] = useMeasure();

	const content = useMemo(() => {
		switch (view) {
			case "default":
				return <DefaultView setView={setView} />;
			case "remove":
				return <RemoveWallet setView={setView} />;
			case "phrase":
				return <Phrase setView={setView} />;
			case "key":
				return <Key setView={setView} />;
		}
	}, [view]);

	return (
		<>
			<button
				className={cn(
					"-translate-y-1/2 -translate-x-1/2 fixed top-1/2 left-1/2 h-[44px] rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-black antialiased transition-colors hover:bg-[#F9F9F8] focus-visible:shadow-focus-ring-button md:font-medium",
					inter.className,
				)}
				onClick={() => setIsOpen(true)}
				type="button"
			>
				Try it out
			</button>
			<Drawer.Root
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<Drawer.Portal>
					<Drawer.Overlay
						className="fixed inset-0 z-10 bg-black/30"
						onClick={() => setIsOpen(false)}
					/>
					<Drawer.Content
						asChild
						className={cn(
							"fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-[#FEFFFE] outline-none md:mx-auto md:w-full",
							inter.className,
						)}
					>
						<motion.div
							animate={{
								height: bounds.height,
								transition: {
									duration: 0.27,
									ease: [0.25, 1, 0.5, 1],
								},
							}}
						>
							<Drawer.Close asChild>
								<button
									data-vaul-no-drag=""
									className="absolute top-7 right-8 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 focus-visible:shadow-focus-ring-button active:scale-75"
									type="button"
								>
									<CloseIcon />
								</button>
							</Drawer.Close>
							<div
								ref={elementRef}
								className="px-6 pt-2.5 pb-6 antialiased"
							>
								<AnimatePresence
									initial={false}
									mode="popLayout"
									custom={view}
								>
									<motion.div
										initial={{
											opacity: 0,
											scale: 0.96,
										}}
										animate={{
											opacity: 1,
											scale: 1,
											y: 0,
										}}
										exit={{
											opacity: 0,
											scale: 0.96,
										}}
										key={view}
										transition={{
											duration: 0.27,
											ease: [0.26, 0.08, 0.25, 1],
										}}
									>
										{content}
									</motion.div>
								</AnimatePresence>
							</div>
						</motion.div>
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>
		</>
	);
}
