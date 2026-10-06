"use client";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Separator from "@radix-ui/react-separator";
import * as Switch from "@radix-ui/react-switch";
import { clsx } from "clsx";
import {
	AnimatePresence,
	MotionConfig,
	motion,
	useReducedMotion,
} from "motion/react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Toaster, toast } from "sonner";

import "./styles.css";

const TABS = [
	"Create Webhook",
	"Connect Repositories",
	"Create API Key",
	"Share Workspace",
] as const;
type ActiveTabType = (typeof TABS)[number];

/**
 * Tracks an element's border-box size. Observing inside the effect (not in a
 * ref callback) keeps it working through StrictMode's remount, so the size is
 * known before the first interaction.
 */
const useElementSize = () => {
	const [element, setElement] = useState<HTMLElement | null>(null);
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});
	useLayoutEffect(() => {
		if (!element) return;
		const observer = new ResizeObserver(([entry]) => {
			const [box] = entry.borderBoxSize;
			setSize({
				width: box.inlineSize,
				height: box.blockSize,
			});
		});
		observer.observe(element);
		return () => observer.disconnect();
	}, [element]);
	return [setElement, size] as const;
};
const ContextualToolbar = () => {
	const [checked, setChecked] = useState(false);
	const [activeTab, setActiveTab] = useState<ActiveTabType | null>(null);
	const [shownTab, setShownTab] = useState<ActiveTabType | null>(null);
	const scrollC = useRef<HTMLDivElement | null>(null);
	const reduced = useReducedMotion() ?? false;
	const [cardRef, bounds] = useElementSize();
	const content = useMemo(() => {
		switch (shownTab) {
			case "Create Webhook":
				return (
					<motion.div
						key="webhook"
						className="h-[320px]"
						initial={{
							opacity: 0,
							filter: "blur(5px)",
						}}
						animate={{
							opacity: 1,
							filter: "blur(0px)",
						}}
						exit={{
							opacity: 0,
							filter: "blur(5px)",
							transition: { duration: 0.15 },
						}}
					>
						<div className="my-3 space-y-2">
							<h2 className="mb-1 text-[15px]">Endpoint</h2>
							<input
								type="text"
								placeholder="https://myapp.com/webhooks"
								className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
							/>
						</div>
						<div className="my-3 space-y-2">
							<h2 className="mb-1 text-[15px]">Projects</h2>
							<form>
								<RadioGroup.Root
									className="flex gap-2.5"
									defaultValue="default"
									aria-label="View density"
								>
									<div className="flex items-center">
										<RadioGroup.Item
											className="h-[15px] w-[15px] cursor-pointer rounded-full bg-white outline-none ring-1 ring-black/10"
											value="default"
											id="r1"
										>
											<RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[8px] after:w-[8px] after:rounded-[50%] after:bg-orange-500 after:content-[''] " />
										</RadioGroup.Item>
										<label
											className=" pl-[10px] text-[14px] text-black/60 leading-none"
											htmlFor="r1"
										>
											All Team Projects in{" "}
											<span className="rounded-md bg-stone-100 p-1 text-orange-500 ">
												acme
											</span>
										</label>
									</div>
									<div className="flex items-center">
										<RadioGroup.Item
											className="h-[15px] w-[15px] cursor-pointer rounded-full bg-white outline-none ring-1 ring-black/10"
											value="comfortable"
											id="r2"
										>
											<RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[8px] after:w-[8px] after:rounded-[50%] after:bg-orange-500 after:content-[''] " />
										</RadioGroup.Item>
										<label
											className="pl-[10px] text-[14px] text-black/60 leading-none"
											htmlFor="r2"
										>
											Tagged Projects
										</label>
									</div>
								</RadioGroup.Root>
							</form>
						</div>
						<div className="my-3 space-y-2">
							<h2 className="mb-1 font-lg">Events</h2>
							<form className=" flex justify-start gap-2 rounded-md bg-zinc-100 p-4">
								<div className="flex flex-col gap-1.5">
									<div className="flex items-center">
										<Checkbox.Root
											className=" flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none"
											defaultChecked
											id="c1"
										>
											<Checkbox.Indicator className="text-orange-500 ">
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
														fillRule="evenodd"
														clipRule="evenodd"
													/>
												</svg>
											</Checkbox.Indicator>
										</Checkbox.Root>
										<label
											className="pl-[10px] text-[14px] text-black/60 leading-none"
											htmlFor="c1"
										>
											Deployment Created
										</label>
									</div>
									<div className="flex items-center">
										<Checkbox.Root
											className=" flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none"
											defaultChecked
											id="c1"
										>
											<Checkbox.Indicator className="text-orange-500 ">
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
														fillRule="evenodd"
														clipRule="evenodd"
													/>
												</svg>
											</Checkbox.Indicator>
										</Checkbox.Root>
										<label
											className="pl-[10px] text-[14px] text-black/60 leading-none"
											htmlFor="c1"
										>
											Deployment Error
										</label>
									</div>
									<div className="flex items-center">
										<Checkbox.Root
											className=" flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none"
											defaultChecked
											id="c1"
										>
											<Checkbox.Indicator className="text-orange-500 ">
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
														fillRule="evenodd"
														clipRule="evenodd"
													/>
												</svg>
											</Checkbox.Indicator>
										</Checkbox.Root>
										<label
											className="pl-[10px] text-[14px] text-black/60 leading-none"
											htmlFor="c1"
										>
											Deployment Cancelled
										</label>
									</div>
								</div>
								<div className="flex flex-col gap-1.5">
									<div className="flex items-center">
										<Checkbox.Root
											className=" flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none"
											defaultChecked
											id="c1"
										>
											<Checkbox.Indicator className="text-orange-500 ">
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
														fillRule="evenodd"
														clipRule="evenodd"
													/>
												</svg>
											</Checkbox.Indicator>
										</Checkbox.Root>
										<label
											className="pl-[10px] text-[14px] text-black/60 leading-none"
											htmlFor="c1"
										>
											Project Created
										</label>
									</div>
									<div className="flex items-center">
										<Checkbox.Root
											className=" flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none"
											defaultChecked
											id="c1"
										>
											<Checkbox.Indicator className="text-orange-500 ">
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
														fillRule="evenodd"
														clipRule="evenodd"
													/>
												</svg>
											</Checkbox.Indicator>
										</Checkbox.Root>
										<label
											className="pl-[10px] text-[14px] text-black/60 leading-none"
											htmlFor="c1"
										>
											Project Deleted
										</label>
									</div>
								</div>
							</form>
						</div>
					</motion.div>
				);
			case "Connect Repositories":
				return (
					<motion.div
						key="repositories"
						className="h-[125px]"
						initial={{
							opacity: 0,
							filter: "blur(5px)",
						}}
						animate={{
							opacity: 1,
							filter: "blur(0px)",
						}}
						exit={{
							opacity: 0,
							filter: "blur(5px)",
							transition: { duration: 0.15 },
						}}
					>
						<h2 className="mt-1.5 mb-2.5 ml-1 text-[15px]">
							Connect Repositories to{" "}
							<span className="rounded-md bg-stone-100 p-1 text-orange-500 ">
								acme
							</span>
						</h2>
						<form className="flex justify-start gap-2 rounded-md">
							<div className="flex flex-col gap-2.5">
								<div className="flex items-center">
									<Checkbox.Root
										className=" flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] border border-black/10 bg-white outline-none"
										id="c1"
									>
										<Checkbox.Indicator className="text-orange-500 ">
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
													fillRule="evenodd"
													clipRule="evenodd"
												/>
											</svg>
										</Checkbox.Indicator>
									</Checkbox.Root>
									<label
										className="pl-[10px] text-[14px] text-black/60 leading-none"
										htmlFor="c1"
									>
										acme-homepage
									</label>
								</div>
								<div className="flex items-center">
									<Checkbox.Root
										className=" flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] border border-black/10 bg-white outline-none"
										id="c1"
									>
										<Checkbox.Indicator className="text-orange-500 ">
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
													fillRule="evenodd"
													clipRule="evenodd"
												/>
											</svg>
										</Checkbox.Indicator>
									</Checkbox.Root>
									<label
										className="pl-[10px] text-[14px] text-black/60 leading-none"
										htmlFor="c1"
									>
										prisma-test
									</label>
								</div>
								<div className="flex items-center">
									<Checkbox.Root
										className=" flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] border border-black/10 bg-white outline-none"
										id="c1"
									>
										<Checkbox.Indicator className="text-orange-500 ">
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
													fillRule="evenodd"
													clipRule="evenodd"
												/>
											</svg>
										</Checkbox.Indicator>
									</Checkbox.Root>
									<label
										className="pl-[10px] text-[14px] text-black/60 leading-none"
										htmlFor="c1"
									>
										legacy-old-homepage
									</label>
								</div>
							</div>
						</form>
					</motion.div>
				);
			case "Create API Key":
				return (
					<motion.div
						key="api-key"
						className="h-[133px]"
						initial={{
							opacity: 0,
							filter: "blur(5px)",
						}}
						animate={{
							opacity: 1,
							filter: "blur(0px)",
						}}
						exit={{
							opacity: 0,
							filter: "blur(5px)",
							transition: { duration: 0.15 },
						}}
					>
						<h2 className="mt-1.5 mb-2.5 ml-1 text-[15px]">
							Create new API key
						</h2>
						<p className="mb-2 text-pretty text-sm">
							Your secret API Key will be shared with all users belonging to
							your
							<span className="rounded-md bg-stone-100 p-1 text-orange-500 ">
								acme
							</span>
							organization
						</p>
						<form className="mb-2 flex justify-start gap-2 rounded-md">
							<input
								type="text"
								placeholder="https://myapp.com/webhooks"
								className="flex h-9 w-full rounded-md border border-input bg-white px-2 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
							/>
						</form>
					</motion.div>
				);
			default:
				return (
					<motion.div
						key="share"
						className="h-[90px]"
						initial={{
							opacity: 0,
							filter: "blur(5px)",
						}}
						animate={{
							opacity: 1,
							filter: "blur(0px)",
						}}
						exit={{
							opacity: 0,
							filter: "blur(5px)",
							transition: { duration: 0.15 },
						}}
					>
						<div className="flex items-center">
							<h2 className="mt-1.5 mb-2.5 ml-1 text-[15px]">Sharing is off</h2>
							<Switch.Root
								checked={checked}
								onClick={(e) => e.stopPropagation()}
								onCheckedChange={(checked) => setChecked(checked)}
								className="relative ml-auto h-[18px] w-[35px] cursor-pointer rounded-full bg-gray-100 outline-none data-[state=checked]:bg-orange-400"
								id="airplane-mode"
							>
								<Switch.Thumb className="block h-[14px] w-[14px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
							</Switch.Root>
						</div>
						<AnimatePresence mode="popLayout" initial={false}>
							{!checked ? (
								<motion.p
									initial={{
										opacity: 0,
										filter: "blur(5px)",
									}}
									animate={{
										opacity: 1,
										filter: "blur(0px)",
									}}
									exit={{
										opacity: 0,
										filter: "blur(5px)",
									}}
									className="mb-2 text-pretty text-sm"
								>
									To share your workspace with other people you need to publish
									it first.
								</motion.p>
							) : (
								<motion.div
									initial={{
										opacity: 0,
										filter: "blur(5px)",
									}}
									animate={{
										opacity: 1,
										filter: "blur(0px)",
									}}
									exit={{
										opacity: 0,
										filter: "blur(5px)",
									}}
									className="relative mb-2 rounded-md shadow-sm"
								>
									<input
										type="text"
										className="flex h-9 w-full rounded-md border border-input bg-white px-2 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
										placeholder="/amazinglink"
									/>
									<div className="absolute inset-y-0 right-0 flex items-center">
										<button
											type="button"
											className="rounded-md bg-transparent px-1.5 py-0.5 text-sm"
										>
											Copy
										</button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				);
		}
	}, [shownTab, checked]);
	useEffect(() => {
		if (shownTab !== null && shownTab !== "Create Webhook" && scrollC.current) {
			scrollC.current.scrollTo({
				left: scrollC.current.scrollWidth,
				behavior: reduced ? "auto" : "smooth",
			});
		} else if (
			(shownTab === null || shownTab === "Create Webhook") &&
			scrollC.current
		) {
			scrollC.current.scrollTo({
				left: 0,
				behavior: reduced ? "auto" : "smooth",
			});
		}
	}, [shownTab, reduced]);
	return (
		<MotionConfig
			reducedMotion="user"
			transition={{
				duration: 0.3,
				bounce: 0,
				type: "spring",
			}}
		>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click closes the panel; Cancel is the keyboard path */}
			{/* biome-ignore lint/a11y/noStaticElementInteractions: same backdrop */}
			<div
				onClick={() => setShownTab(null)}
				className="flex h-screen items-center justify-center"
			>
				<Toaster />
				{/* The card animates to its measured content size, so opening,
				    closing and switching tabs is one smooth resize instead of
				    a jump. Content is bottom-anchored so the toolbar stays put
				    while the card grows or shrinks above it. */}
				<motion.div
					initial={false}
					animate={{
						// +2 for the card's 1px border, so overflow-hidden
						// doesn't clip the measured content. "auto" until the
						// first measurement so later changes animate from a
						// real size.
						width: bounds.width ? bounds.width + 2 : "auto",
						height: bounds.height ? bounds.height + 2 : "auto",
					}}
					className="relative flex flex-col items-center justify-end overflow-hidden rounded-xl border border-black/30 bg-white"
				>
					<div ref={cardRef} className="flex w-max flex-col items-center p-1.5">
						<AnimatePresence initial={false} mode="popLayout" anchorY="bottom">
							{shownTab === "Create Webhook" ? (
								<motion.h1
									key="webhook-title"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{
										opacity: 0,
										transition: {
											duration: 0.15,
										},
									}}
									className="mt-1 mb-2 ml-2 place-self-start text-[15px]"
								>
									Create Webhook
								</motion.h1>
							) : null}
						</AnimatePresence>

						<AnimatePresence initial={false} mode="popLayout" anchorY="bottom">
							{/* The panel's [data-motion-pop-id] rule: popLayout marks
							    the exiting content block with that attribute. It
							    overlaps the new block while it fades, so it must
							    not take clicks. */}
							{shownTab !== null ? (
								<motion.div
									key="panel"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{
										opacity: 0,
										transition: {
											duration: 0.15,
										},
									}}
									onClick={(e) => e.stopPropagation()}
									className="relative flex w-[min(450px,calc(100vw-48px))] flex-col overflow-hidden rounded-lg [&>[data-motion-pop-id]]:pointer-events-none border border-black/10 bg-stone-50 p-3"
								>
									<AnimatePresence mode="popLayout">{content}</AnimatePresence>
									<div className="ml-auto flex gap-1 text-sm">
										<button
											type="button"
											onClick={() => setShownTab(null)}
											className="rounded-md bg-transparent px-1.5 py-0.5 text-sm hover:bg-stone-200"
										>
											Cancel
										</button>
										<button
											type="button"
											onClick={() => {
												toast.message("Settings Saved", {});
												setShownTab(null);
											}}
											className="rounded-md bg-orange-500 px-2.5 py-1 text-sm text-white disabled:bg-orange-300"
										>
											{shownTab === "Create API Key"
												? "Create Secret Key"
												: shownTab}
										</button>
									</div>
								</motion.div>
							) : null}
						</AnimatePresence>

						<div className="flex items-center p-2.5">
							<motion.div
								ref={scrollC}
								className={clsx(
									"scrollContainer flex w-[min(408px,calc(100vw-110px))] snap-x items-center overflow-scroll",
								)}
							>
								{TABS.map((tab) => (
									<motion.li
										className={clsx(
											"relative cursor-pointer snap-center list-none space-x-4 whitespace-nowrap text-nowrap px-[6.9px] py-1.5 text-sm text-stone-600 outline-none transition-colors",
											activeTab === tab ? "text-black " : null,
											shownTab === tab ? "text-black " : null,
										)}
										tabIndex={0}
										key={tab}
										onFocus={() => setActiveTab(tab)}
										onMouseOver={() => setActiveTab(tab)}
										onMouseLeave={() => setActiveTab(tab)}
										onClick={(e) => {
											e.stopPropagation();
											setShownTab(tab);
										}}
									>
										{activeTab === tab ? (
											<motion.div
												layoutId="tab-indicator"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{
													duration: 0.25,
												}}
												className="absolute inset-0 rounded-lg bg-stone-100"
											/>
										) : null}
										<span className="relative text-inherit">{tab}</span>
									</motion.li>
								))}
							</motion.div>
							<div className="ml-auto flex items-center gap-3.5">
								<Separator.Root
									className="bg-stone-200 data-[orientation=vertical]:h-5 data-[orientation=vertical]:w-[1.5px]"
									decorative
									orientation="vertical"
								/>
								<button
									type="button"
									aria-label="Close panel"
									onClick={() => setShownTab(null)}
									className="flex"
								>
									<svg
										width="15"
										height="15"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>svg</title>
										<path
											d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</MotionConfig>
	);
};

export default ContextualToolbar;
