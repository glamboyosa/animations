"use client";

import {
	motion,
	useMotionValueEvent,
	useMotionValue,
	useTransform,
} from "motion/react";
import {
	useEffect,
	useRef,
	useState,
} from "react";

const Slider = () => {
	const x = useMotionValue(0);
	const constrainsRef =
		useRef<HTMLDivElement | null>(null);
	const blurRef = useRef<HTMLSpanElement | null>(
		null,
	);
	const [constraintRight, setConstraintRight] =
		useState(0);
	const [finalBlurValue, setFinalBlurValue] =
		useState("blur(0px)");

	const blurValue = useTransform(
		x,
		[41, 160],
		["blur(6px)", "blur(1px)"],
	);

	const preventTextSelection = (
		e:
			| React.MouseEvent<HTMLDivElement>
			| React.TouchEvent<HTMLDivElement>,
	) => {
		e.preventDefault();
		return false;
	};
	useMotionValueEvent(x, "change", (latest) => {
		if (blurRef.current) {
			if (latest < 41 || latest > 160) {
				blurRef.current.style.filter =
					"blur(0px)";
			} else {
				blurRef.current.style.filter =
					blurValue.get();
			}
		}
	});

	useEffect(() => {
		if (constrainsRef.current) {
			const containerWidth =
				constrainsRef.current.offsetWidth;
			setConstraintRight(containerWidth - 56); // 56px is the width of the draggable element (40px) plus right padding (16px)
		}
	}, []);
	return (
		<div className="flex h-screen items-center justify-center">
			<div
				ref={constrainsRef}
				className="relative flex h-14 w-64 items-center rounded-2xl bg-gray-200 px-4 shadow-xl"
				onMouseDown={preventTextSelection}
				onTouchStart={preventTextSelection}
			>
				<motion.div
					drag="x"
					transition={{
						type: "spring",
						bounce: 0.55,
					}}
					dragConstraints={{
						left: 0,
						right: constraintRight,
					}}
					dragElastic={0.1}
					style={{ x }}
					className="absolute left-2 z-50 flex size-6 cursor-grab items-center justify-center rounded-lg bg-white p-5 text-xl active:cursor-grabbing"
				>
					<div>
						<svg
							width="20"
							height="20"
							viewBox="0 0 15 15"
							fill="#000"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Right arrow</title>
							<path
								d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
								fill="#000"
								fill-rule="evenodd"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				</motion.div>
				<motion.span
					ref={blurRef}
					className="absolute right-0 left-0 text-center text-black/40 text-sm"
				>
					Slide to start
				</motion.span>
			</div>
		</div>
	);
};

export default Slider;
