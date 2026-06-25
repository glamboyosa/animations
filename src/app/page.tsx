"use client";

import Link from "next/link";
import {
	motion,
	useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";

type Demo = {
	id: string;
	title: ReactNode;
	description: ReactNode;
	featured?: boolean;
	prefetch?: boolean;
};

function XMark({
	className,
}: {
	className?: string;
}) {
	return (
		<svg
			viewBox="0 0 24 24"
			aria-hidden
			fill="currentColor"
			className={className}
		>
			<title>X</title>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

const demos: Demo[] = [
	{
		id: "13",
		title: (
			<span className="inline-flex items-center gap-1.5">
				<XMark className="size-[0.9em] shrink-0" />
				stacked toasts
			</span>
		),
		description:
			"Glassy push-stack notifications by Benji Taylor — depth, blur, and timing matched to the original.",
		featured: true,
	},
	{
		id: "12",
		title: "Apple 3D icons",
		description: (
			<>
				Airbnb-inspired 3D icon carousel with
				smooth fades. Models from{" "}
				<a
					href="https://www.thiings.co/things"
					target="_blank"
					rel="noopener noreferrer"
					className="underline decoration-neutral-400/60 underline-offset-2 transition-colors [@media(hover:hover)_and_(pointer:fine)]:hover:text-neutral-900 dark:[@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
					onClick={(event) =>
						event.stopPropagation()
					}
				>
					thiings.co
				</a>
				.
			</>
		),
		featured: true,
		prefetch: true,
	},
	{
		id: "10",
		title: "Dynamic Island music",
		description:
			"iOS Dynamic Island–inspired player with animated waveforms and a color-matched palette.",
		featured: true,
	},
	{
		id: "11",
		title: "iOS slider",
		description:
			"Animated slider with dynamic blur that tracks your thumb as you drag.",
		featured: true,
	},
	{
		id: "01",
		title: "Dynamic Settings",
		description:
			"Dynamic Settings panel from UI Labs by mrnest.",
	},
	{
		id: "02",
		title: "Contextual Toolbar",
		description:
			"Contextual Toolbar from UI Labs by mrnest.",
	},
	{
		id: "03",
		title: "Available homes",
		description:
			'Airbnb "available homes" preview microinteraction.',
	},
	{
		id: "04",
		title: "Share wishlist",
		description:
			'Airbnb "share wishlist" microinteraction.',
	},
	{
		id: "05",
		title: "Directional popover",
		description:
			"Directionally aware two-step popover.",
	},
	{
		id: "06",
		title: "Payments calculator",
		description:
			"Payments card calculator experiment.",
	},
	{
		id: "07",
		title: "Family drawer",
		description:
			"Family (Family.co) iOS-style drawer using Vaul.",
	},
	{
		id: "08",
		title: "Dynamic Island ring",
		description:
			"iOS Dynamic Island ring animation.",
	},
	{
		id: "09",
		title: "Dynamic Island timer",
		description:
			"iOS Dynamic Island timer animation.",
	},
];

const ENTER_EASE = [0.2, 0, 0, 1] as const;

const cardClassName = (featured: boolean) =>
	[
		"group relative block rounded-2xl bg-white/90 p-5 shadow-[0_1px_1px_rgba(0,0,0,0.03),0_4px_16px_rgba(0,0,0,0.06)] outline outline-1 outline-black/[0.04] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none dark:bg-neutral-900/80 dark:shadow-[0_1px_1px_rgba(0,0,0,0.2),0_8px_24px_rgba(0,0,0,0.35)] dark:outline-white/[0.06]",
		featured ? "p-6 sm:p-7" : "",
		"[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_2px_2px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.08)] dark:[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_2px_2px_rgba(0,0,0,0.25),0_16px_40px_rgba(0,0,0,0.45)]",
	].join(" ");

function DemoCard({
	demo,
	index,
	reduced,
	featured = false,
}: {
	demo: Demo;
	index: number;
	reduced: boolean;
	featured?: boolean;
}) {
	return (
		<motion.li
			initial={
				reduced
					? false
					: {
							opacity: 0,
							transform: "translateY(10px)",
						}
			}
			animate={{
				opacity: 1,
				transform: "translateY(0)",
			}}
			transition={{
				duration: reduced ? 0 : 0.32,
				delay: reduced ? 0 : index * 0.045,
				ease: ENTER_EASE,
			}}
		>
			<Link
				href={`/${demo.id}`}
				prefetch={demo.prefetch}
				className={cardClassName(featured)}
			>
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						<p className="mb-1.5 font-medium text-neutral-400 text-xs uppercase tabular-nums tracking-widest">
							{demo.id}
						</p>
						<h2
							className={`text-balance font-semibold text-neutral-900 tracking-tight dark:text-neutral-50 ${featured ? "text-xl sm:text-2xl" : "text-lg"}`}
						>
							{demo.title}
						</h2>
						<p className="mt-2 text-pretty text-neutral-500 text-sm leading-relaxed dark:text-neutral-400">
							{demo.description}
						</p>
					</div>
					<span
						aria-hidden
						className="shrink-0 pt-1 text-neutral-300 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transform-none dark:text-neutral-600 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-neutral-500 dark:[@media(hover:hover)_and_(pointer:fine)]:group-hover:text-neutral-300"
					>
						→
					</span>
				</div>
			</Link>
		</motion.li>
	);
}

export default function Home() {
	const reduced = useReducedMotion() ?? false;
	const featured = demos.filter(
		(demo) => demo.featured,
	);
	const rest = demos.filter(
		(demo) => !demo.featured,
	);

	return (
		<div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(120,120,120,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)]" />
			</div>

			<main className="relative mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16 lg:py-20">
				<header className="mb-14 flex flex-col gap-8 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-2xl">
						<p className="mb-3 font-medium text-neutral-500 text-sm uppercase tracking-widest">
							Animations by Osa
						</p>
						<h1 className="text-balance font-semibold text-4xl tracking-tight sm:text-5xl">
							UI animations & recreations
						</h1>
						<p className="mt-4 max-w-xl text-pretty text-lg text-neutral-600 leading-relaxed dark:text-neutral-400">
							Microinteractions reverse-engineered
							from products I admire — motion,
							timing, and feel included.
						</p>
					</div>

					<a
						href="https://github.com/glamboyosa/animations"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 font-medium text-neutral-700 text-sm shadow-[0_1px_1px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)] outline outline-1 outline-black/[0.04] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.96] motion-reduce:transform-none dark:bg-neutral-900/80 dark:text-neutral-300 dark:outline-white/[0.06] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_2px_2px_rgba(0,0,0,0.05),0_8px_20px_rgba(0,0,0,0.08)]"
					>
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden
						>
							<title>GitHub</title>
							<path
								d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
								fill="currentColor"
								fillRule="evenodd"
								clipRule="evenodd"
							/>
						</svg>
						Source on GitHub
					</a>
				</header>

				<section className="mb-14">
					<h2 className="mb-5 font-medium text-neutral-500 text-sm uppercase tracking-widest">
						Highlights
					</h2>
					<ul className="grid gap-4 sm:grid-cols-2">
						{featured.map((demo, index) => (
							<DemoCard
								key={demo.id}
								demo={demo}
								index={index}
								reduced={reduced}
								featured
							/>
						))}
					</ul>
				</section>

				<section>
					<h2 className="mb-5 font-medium text-neutral-500 text-sm uppercase tracking-widest">
						All demos
					</h2>
					<ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{rest.map((demo, index) => (
							<DemoCard
								key={demo.id}
								demo={demo}
								index={index + featured.length}
								reduced={reduced}
							/>
						))}
					</ul>
				</section>
			</main>
		</div>
	);
}
