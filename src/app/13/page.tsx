"use client";

import Image from "next/image";
import { IBM_Plex_Sans } from "next/font/google";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	AnimatePresence,
	motion,
	useReducedMotion,
	type Transition,
} from "motion/react";

const toastFont = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	display: "swap",
});

type ToastType =
	| "message"
	| "retweet"
	| "like"
	| "follow";

type Toast = {
	id: string;
	type: ToastType;
	headline: string;
	preview: string;
	avatar: string;
};

type StackEntry = {
	key: string;
	toast: Toast;
};

const TOAST_SEQUENCE: Toast[] = [
	{
		id: "repost",
		type: "retweet",
		headline: "@genehackerman reposted your post",
		preview: "stacked toasts are actually insane",
		avatar: "https://unavatar.io/x/genehackerman",
	},
	{
		id: "like",
		type: "like",
		headline: "@theweeknd liked your post",
		preview: "blinding lights on repeat",
		avatar:
			"https://image-cdn-ak.spotifycdn.com/image/ab67616100005174c1719ac9e6a75c1c25835018",
	},
	{
		id: "follow",
		type: "follow",
		headline: "@nova_ui followed you",
		preview: "you now follow each other",
		avatar: "https://i.pravatar.cc/150?u=nova_ui",
	},
	{
		id: "dm",
		type: "message",
		headline: "@glamboyosa sent you a message",
		preview: "ok but we need to ship this toast",
		avatar: "https://unavatar.io/x/glamboyosa",
	},
];

const VISIBLE_COUNT = 3;
const PUSH_INTERVAL_MS = 1700;

const PUSH_TRANSITION: Transition = {
	type: "tween",
	duration: 0.52,
	ease: [0.32, 0.72, 0, 1],
};

const ENTER_TRANSITION: Transition = {
	type: "tween",
	duration: 0.56,
	ease: [0.23, 1, 0.32, 1],
};

const EXIT_TRANSITION: Transition = {
	type: "tween",
	duration: 0.42,
	ease: [0.32, 0.72, 0, 1],
};

function createEntry(
	toast: Toast,
	suffix: string,
): StackEntry {
	return { key: `${toast.id}-${suffix}`, toast };
}

function initialStack(): StackEntry[] {
	return TOAST_SEQUENCE.slice(
		0,
		VISIBLE_COUNT,
	).map((toast, index) =>
		createEntry(toast, `init-${index}`),
	);
}

function slotStyle(
	position: number,
	reduced: boolean,
) {
	if (reduced) {
		return {
			opacity:
				position === 0
					? 1
					: position === 1
						? 0.55
						: 0.3,
			transform: `translate3d(0, ${position * 10}px, 0) scale(${1 - position * 0.028})`,
			filter: "none",
			zIndex: 30 - position,
		};
	}

	const y = position * 22;
	const scale = 1 - position * 0.048;

	return {
		opacity:
			position === 0
				? 1
				: position === 1
					? 0.82
					: 0.58,
		transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
		filter:
			position === 1
				? "blur(2px)"
				: position >= 2
					? "blur(5px)"
					: "none",
		zIndex: 30 - position,
	};
}

function RepostIcon() {
	return (
		<svg
			width="13"
			height="13"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.35"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<title>Repost</title>
			<path d="M17 2l4 4-4 4" />
			<path d="M3 11v-1a4 4 0 0 1 4-4h14" />
			<path d="M7 22l-4-4 4-4" />
			<path d="M21 13v1a4 4 0 0 1-4 4H3" />
		</svg>
	);
}

function HeartIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden
		>
			<title>Like</title>
			<path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z" />
		</svg>
	);
}

function FollowIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden
		>
			<title>Follow</title>
			<path d="M10 4H14V10H20V14H14V20H10V14H4V10H10V4Z" />
		</svg>
	);
}

function TypeBadge({
	type,
}: {
	type: ToastType;
}) {
	const className =
		"absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full border-2 border-black";

	if (type === "message") {
		return (
			<span
				className={`${className} size-[18px] bg-[#1d9bf0]`}
				aria-hidden
			/>
		);
	}

	if (type === "retweet") {
		return (
			<span
				className={`${className} size-[22px] bg-[#0f0f0f] text-[#00ba7c]`}
				aria-hidden
			>
				<RepostIcon />
			</span>
		);
	}

	if (type === "like") {
		return (
			<span
				className={`${className} size-[18px] bg-[#0f0f0f] text-[#f91880]`}
				aria-hidden
			>
				<HeartIcon />
			</span>
		);
	}

	return (
		<span
			className={`${className} size-[18px] bg-[#0f0f0f] text-white`}
			aria-hidden
		>
			<FollowIcon />
		</span>
	);
}

function ToastAvatar({
	src,
	type,
}: {
	src: string;
	type: ToastType;
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
			<TypeBadge type={type} />
		</div>
	);
}

function ToastCard({
	entry,
	position,
	reduced,
	isEntering,
}: {
	entry: StackEntry;
	position: number;
	reduced: boolean;
	isEntering: boolean;
}) {
	const slot = slotStyle(position, reduced);

	return (
		<motion.article
			layout={false}
			initial={
				isEntering
					? {
							opacity: 0,
							transform:
								"translate3d(0, -44px, 0) scale(0.97)",
							filter: "none",
						}
					: false
			}
			animate={{
				opacity: slot.opacity,
				transform: slot.transform,
				filter: slot.filter,
			}}
			exit={{
				opacity: 0,
				transform:
					"translate3d(0, 64px, 0) scale(0.9)",
				filter: reduced ? "none" : "blur(0.8px)",
				transition: EXIT_TRANSITION,
			}}
			transition={
				isEntering
					? ENTER_TRANSITION
					: PUSH_TRANSITION
			}
			style={{
				zIndex: slot.zIndex,
				transformOrigin: "center top",
				willChange: "transform, opacity",
			}}
			className="pointer-events-none absolute inset-x-0 top-0 mx-auto w-full max-w-[420px]"
		>
			<div
				className="rounded-[22px] px-4 py-3.5"
				style={{
					background: "rgba(30, 30, 32, 0.78)",
					backdropFilter:
						"blur(32px) saturate(1.2)",
					WebkitBackdropFilter:
						"blur(32px) saturate(1.2)",
					boxShadow: [
						"0 0 0 1px rgba(255, 255, 255, 0.09)",
						"inset 0 1px 0 rgba(255, 255, 255, 0.08)",
						"0 16px 48px rgba(0, 0, 0, 0.55)",
					].join(", "),
				}}
			>
				<div className="flex items-start gap-3">
					<ToastAvatar
						src={entry.toast.avatar}
						type={entry.toast.type}
					/>
					<div className="min-w-0 flex-1 pt-0.5">
						<p className="text-pretty font-semibold text-[#f7f9f9] text-[15px] leading-snug">
							{entry.toast.headline}
						</p>
						<p className="mt-1 truncate text-[#8b8b90] text-[15px] leading-snug">
							{entry.toast.preview}
						</p>
					</div>
				</div>
			</div>
		</motion.article>
	);
}

export default function ProposeAToast() {
	const reduced = useReducedMotion() ?? false;
	const [stack, setStack] =
		useState<StackEntry[]>(initialStack);
	const [sequenceIndex, setSequenceIndex] =
		useState(VISIBLE_COUNT);
	const [enteringKey, setEnteringKey] = useState<
		string | null
	>(null);
	const pushCounter = useRef(0);

	const pushToast = useCallback(() => {
		const toast =
			TOAST_SEQUENCE[
				sequenceIndex % TOAST_SEQUENCE.length
			];
		const suffix = String(pushCounter.current++);
		const key = `${toast.id}-${suffix}`;

		setSequenceIndex((index) => index + 1);
		setEnteringKey(key);
		setStack((current) => [
			{ key, toast },
			...current.slice(0, VISIBLE_COUNT - 1),
		]);
	}, [sequenceIndex]);

	useEffect(() => {
		if (!enteringKey) return;
		const timer = setTimeout(
			() => setEnteringKey(null),
			620,
		);
		return () => clearTimeout(timer);
	}, [enteringKey]);

	useEffect(() => {
		const interval = setInterval(
			pushToast,
			reduced ? 2800 : PUSH_INTERVAL_MS,
		);
		return () => clearInterval(interval);
	}, [pushToast, reduced]);

	return (
		<button
			type="button"
			aria-label="Show next toast"
			onClick={pushToast}
			className={`${toastFont.className} flex min-h-screen w-full items-center justify-center bg-black tracking-[-0.01em] antialiased active:scale-[0.995] motion-reduce:active:scale-100`}
		>
			<div className="relative h-[230px] w-full max-w-[440px] px-5">
				<AnimatePresence initial={false}>
					{stack.map((entry, position) => (
						<ToastCard
							key={entry.key}
							entry={entry}
							position={position}
							reduced={reduced}
							isEntering={
								entry.key === enteringKey
							}
						/>
					))}
				</AnimatePresence>
			</div>
		</button>
	);
}
