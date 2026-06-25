"use client";

import Image from "next/image";
import {
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	motion,
	useReducedMotion,
	type Transition,
} from "motion/react";

type ToastType = "message" | "retweet" | "like";

type Toast = {
	id: string;
	type: ToastType;
	username: string;
	headline: string;
	preview?: string;
	avatar: string;
};

const TOASTS: Toast[] = [
	{
		id: "dm",
		type: "message",
		username: "glamboyosa",
		headline: "@glamboyosa sent you a message",
		preview: "ok but we need to ship this toast",
		avatar: "https://unavatar.io/x/glamboyosa",
	},
	{
		id: "rt",
		type: "retweet",
		username: "genehackerman",
		headline: "@genehackerman reposted",
		preview: "stacked toasts are actually insane",
		avatar: "https://unavatar.io/x/genehackerman",
	},
	{
		id: "like",
		type: "like",
		username: "theweeknd",
		headline: "@theweeknd liked your post",
		preview: "blinding lights on repeat",
		avatar:
			"https://image-cdn-ak.spotifycdn.com/image/ab67616100005174c1719ac9e6a75c1c25835018",
	},
	{
		id: "random",
		type: "like",
		username: "nova_ui",
		headline: "@nova_ui liked your post",
		preview: "why does this feel so premium",
		avatar: "https://i.pravatar.cc/150?u=nova_ui",
	},
];

const CYCLE_SPRING: Transition = {
	type: "spring",
	duration: 0.35,
	bounce: 0,
};

const ENTER_SPRING: Transition = {
	type: "spring",
	duration: 0.5,
	bounce: 0.08,
};

const TEXT_ENTER: Transition = {
	type: "spring",
	duration: 0.35,
	bounce: 0,
};

function stackStyle(
	position: number,
	reduced: boolean,
) {
	if (reduced) {
		return {
			opacity: position === 0 ? 1 : 0.35,
			transform: `translateY(${position * -8}px) scale(${1 - position * 0.03})`,
			zIndex: 10 - position,
		};
	}

	return {
		opacity: 1 - position * 0.22,
		transform: `translateY(${position * -20}px) scale(${1 - position * 0.045})`,
		zIndex: 10 - position,
	};
}

function RetweetIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="shrink-0 text-[#00ba7c]"
			aria-hidden
		>
			<title>Repost</title>
			<path d="M4.5 3.88l4.432 4.14-1.02 1.015L3.5 5.5v7h7v-1.5H5.5V3.88zm15 16.24l-4.432-4.14 1.02-1.015L20.5 18.5v-7h-7v1.5h4.5v5.62z" />
		</svg>
	);
}

function HeartIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="currentColor"
			className="shrink-0 text-[#f91880]"
			aria-hidden
		>
			<title>Like</title>
			<path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z" />
		</svg>
	);
}

function ToastAvatar({
	src,
	showOnline,
}: {
	src: string;
	showOnline?: boolean;
}) {
	return (
		<div className="relative shrink-0">
			<Image
				src={src}
				alt=""
				width={40}
				height={40}
				className="size-10 rounded-full object-cover outline outline-1 outline-white/10"
				unoptimized
			/>
			{showOnline ? (
				<span className="-right-0.5 absolute bottom-0 size-3 rounded-full border-2 border-[#1a1a1a] bg-[#1d9bf0]" />
			) : null}
		</div>
	);
}

function ToastText({
	headline,
	preview,
	staggerIn,
	baseDelay,
}: {
	headline: string;
	preview?: string;
	staggerIn: boolean;
	baseDelay: number;
}) {
	if (!staggerIn) {
		return (
			<>
				<p className="text-pretty text-[15px] text-white/90 leading-snug">
					{headline}
				</p>
				{preview ? (
					<p className="mt-1 truncate text-[15px] text-white/45 leading-snug">
						{preview}
					</p>
				) : null}
			</>
		);
	}

	return (
		<>
			<motion.p
				initial={{
					opacity: 0,
					transform: "translateY(6px)",
				}}
				animate={{
					opacity: 1,
					transform: "translateY(0)",
				}}
				transition={{
					...TEXT_ENTER,
					delay: baseDelay + 0.05,
				}}
				className="text-pretty text-[15px] text-white/90 leading-snug"
			>
				{headline}
			</motion.p>
			{preview ? (
				<motion.p
					initial={{
						opacity: 0,
						transform: "translateY(6px)",
					}}
					animate={{
						opacity: 1,
						transform: "translateY(0)",
					}}
					transition={{
						...TEXT_ENTER,
						delay: baseDelay + 0.12,
					}}
					className="mt-1 truncate text-[15px] text-white/45 leading-snug"
				>
					{preview}
				</motion.p>
			) : null}
		</>
	);
}

function ToastCard({
	toast,
	position,
	reduced,
	introComplete,
	toastIndex,
}: {
	toast: Toast;
	position: number;
	reduced: boolean;
	introComplete: boolean;
	toastIndex: number;
}) {
	const stack = stackStyle(position, reduced);
	const cardDelay = introComplete
		? 0
		: toastIndex * 0.11;

	return (
		<motion.article
			initial={{
				opacity: 0,
				transform: "translateY(32px) scale(0.95)",
			}}
			animate={{
				opacity: stack.opacity,
				transform: stack.transform,
			}}
			transition={{
				...(introComplete
					? CYCLE_SPRING
					: ENTER_SPRING),
				delay: cardDelay,
			}}
			style={{
				zIndex: stack.zIndex,
				transformOrigin: "center bottom",
			}}
			className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-[400px]"
		>
			<div
				className="rounded-2xl px-4 py-3.5"
				style={{
					background: "rgba(28, 28, 28, 0.82)",
					backdropFilter: "blur(24px)",
					boxShadow: [
						"0 0 0 1px rgba(255, 255, 255, 0.08)",
						"0 16px 48px rgba(0, 0, 0, 0.55)",
						"0 4px 12px rgba(0, 0, 0, 0.35)",
					].join(", "),
				}}
			>
				<div className="flex items-start gap-3">
					{toast.type === "message" ? (
						<ToastAvatar
							src={toast.avatar}
							showOnline
						/>
					) : toast.type === "retweet" ? (
						<RetweetIcon />
					) : (
						<HeartIcon />
					)}

					<div className="min-w-0 flex-1 pt-0.5">
						<ToastText
							headline={toast.headline}
							preview={toast.preview}
							staggerIn={
								!introComplete && position === 0
							}
							baseDelay={cardDelay}
						/>
					</div>
				</div>
			</div>
		</motion.article>
	);
}

export default function ProposeAToast() {
	const reduced = useReducedMotion() ?? false;
	const [activeIndex, setActiveIndex] =
		useState(0);
	const [introComplete, setIntroComplete] =
		useState(false);

	const ordered = useMemo(() => {
		return TOASTS.map((toast, index) => {
			const position =
				(index - activeIndex + TOASTS.length) %
				TOASTS.length;
			return { toast, position };
		}).sort((a, b) => b.position - a.position);
	}, [activeIndex]);

	useEffect(() => {
		const introTimer = setTimeout(
			() => setIntroComplete(true),
			80 + TOASTS.length * 110 + 500,
		);
		return () => clearTimeout(introTimer);
	}, []);

	useEffect(() => {
		if (!introComplete) return;

		const interval = setInterval(
			() => {
				setActiveIndex(
					(prev) => (prev + 1) % TOASTS.length,
				);
			},
			reduced ? 4000 : 2400,
		);

		return () => clearInterval(interval);
	}, [introComplete, reduced]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-black antialiased">
			<p className="mb-16 text-balance px-6 text-center text-sm text-white/30">
				I&apos;d like to propose a toast
			</p>

			<div
				className="relative h-[220px] w-full max-w-[440px] px-5"
				style={{
					perspective: reduced
						? undefined
						: "1200px",
				}}
			>
				{ordered.map(({ toast, position }) => (
					<ToastCard
						key={toast.id}
						toast={toast}
						position={position}
						reduced={reduced}
						introComplete={introComplete}
						toastIndex={TOASTS.findIndex(
							(t) => t.id === toast.id,
						)}
					/>
				))}
			</div>

			<button
				type="button"
				onClick={() =>
					setActiveIndex(
						(prev) => (prev + 1) % TOASTS.length,
					)
				}
				className="mt-20 min-h-10 min-w-10 rounded-full px-5 py-2.5 text-sm text-white/40 transition-[transform,opacity,color] duration-200 ease-out hover:text-white/70 active:scale-[0.96]"
			>
				Next toast
			</button>
		</div>
	);
}
