"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DEMO_IDS = [
	"01",
	"02",
	"03",
	"04",
	"05",
	"06",
	"07",
	"08",
	"09",
	"10",
	"11",
	"12",
	"13",
];

const linkClassName =
	"inline-flex min-h-10 items-center rounded-full px-3 outline-none transition-colors duration-150 focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white/80 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/10 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white";

/**
 * Floating previous / all demos / next links on every demo route. It sits
 * below each demo's own drawers and overlays (z-10 and up), so it never
 * covers an open sheet.
 */
export const DemoNav = () => {
	const pathname = usePathname();
	const index = DEMO_IDS.indexOf(pathname.slice(1));
	if (index === -1) return null;

	const previous = DEMO_IDS[index - 1];
	const next = DEMO_IDS[index + 1];

	return (
		<nav
			aria-label="Demo navigation"
			className="fixed bottom-4 left-1/2 z-[5] flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-neutral-900/85 p-1 font-medium text-sm text-white/70 tabular-nums shadow-[0_8px_24px_rgba(0,0,0,0.25)] ring-1 ring-white/10 backdrop-blur-md"
		>
			{previous ? (
				<Link
					href={`/${previous}`}
					aria-label={`Previous demo, ${previous}`}
					className={linkClassName}
				>
					← {previous}
				</Link>
			) : null}
			<Link href="/" className={linkClassName}>
				All demos
			</Link>
			{next ? (
				<Link
					href={`/${next}`}
					aria-label={`Next demo, ${next}`}
					className={linkClassName}
				>
					{next} →
				</Link>
			) : null}
		</nav>
	);
};
