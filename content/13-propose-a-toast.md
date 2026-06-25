# How to Recreate X's Stacked Toast Notifications

**Demo:** [animations.glamboyosa/13](https://animations.glamboyosa/13) · **Source:** [github.com/glamboyosa/animations](https://github.com/glamboyosa/animations) · **Reference:** [Benji Taylor — "I'd like to propose a toast"](https://x.com/benjitaylor/status/2069168413306667353)

---

When Benji Taylor posted [a short motion piece](https://x.com/benjitaylor/status/2069168413306667353) titled *"I'd like to propose a toast"*, the joke was obvious. He was proposing a redesign of X's notification toasts — the little cards that slide in when someone DMs you, reposts you, or likes your post.

What made it land wasn't a Figma mockup. It was motion. Three glassy cards, stacked in 3D, each one a different notification type, cycling with weight and depth. The meta copy inside the toasts was funny. The *feel* was the pitch.

This article walks through how I recreated that stack in React and Motion — what I copied from the original, what I got wrong on the first pass, and the motion details that actually matter if you want it to feel premium instead of "CSS homework."

## Table of Contents

- [What the original does](#what-the-original-does)
- [What my first version got wrong](#what-my-first-version-got-wrong)
- [Prerequisites](#prerequisites)
- [What you will learn](#what-you-will-learn)
- [Push stack, not carousel](#push-stack-not-carousel)
- [Glass surfaces without hard borders](#glass-surfaces-without-hard-borders)
- [Timing that matches the OG clip](#timing-that-matches-the-og-clip)
- [Avatars with type badges](#avatars-with-type-badges)
- [Accessibility](#accessibility)
- [What I deliberately did not build](#what-i-deliberately-did-not-build)
- [Conclusion](#conclusion)

## What the original does

Benji's clip is roughly eight seconds on a black background. **Three** notification cards are visible at once — never four. The sequence cycles through four notification types (repost → like → follow → message), but only three occupy the stack at any moment.

1. **Repost** — avatar with green repost badge overlaid
2. **Like** — avatar with pink heart badge overlaid
3. **Follow** — avatar with follow badge overlaid
4. **DM** — avatar with blue online dot

The front card is full size at the **top** of the stack. Cards behind it are smaller, lower down, softer, and slightly blurred. When a new notification arrives, it **drops in from above**, the existing cards shuffle back one slot, and the rearmost card exits downward.

That's a **push stack** — not a carousel that rotates which card is "active." The canvas is pure `#000`. No title. No button.

## What my first version got wrong

I screen-recorded v1 next to Benji's MP4 and the deviance was obvious. Frame-by-frame comparison surfaced four real problems:

| Issue | v1 (wrong) | OG (right) |
| --- | --- | --- |
| **Motion model** | Rotated `activeIndex` — all four cards shuffled every 2.4s | New toast pushes in; oldest exits; only three visible |
| **Timing** | 350ms snappy spring on every cycle | ~780ms ease-out push, ~2s between beats |
| **Stack depth** | `-20px` offset, 4 cards fighting for space | `-30px` offset, 3 cards, stronger scale falloff |
| **Chrome** | Title + "Next toast" button on screen | Pure black canvas |
| **Stack anchor** | Front at bottom, enters from below | Front at top, enters from above |
| **Surface** | `rgba(32,32,32)` on `#000` — muddy, low contrast | Lifted gray gradient on `#0b0b0d` + radial glow |

| **Card layout** | Icon-only for repost/like rows | Avatar on every type with badge overlay |

v2 fixed the carousel but still anchored the stack at the bottom — new toasts slid **up**, which reads backwards next to the OG. It also put near-black glass on pure `#000`, which kills contrast. Both are feel problems, not tuning problems.

## Prerequisites

To follow along, you should have:

- Basic React and TypeScript
- Familiarity with CSS `transform` and `opacity`
- [Motion](https://motion.dev/) installed — this demo uses `motion/react` and `AnimatePresence`

You do not need Sonner, Radix, or X's actual toast implementation. This is a standalone recreation for learning.

## What you will learn

- Why a **push stack** beats an `activeIndex` carousel for this effect
- How to use `AnimatePresence` for enter/shift/exit in one gesture
- Matching OG timing with tweens (`0.78s` push, `2s` interval) instead of fast springs
- Avatar + badge overlays for every notification type
- When subtle `blur()` on back slots is worth the tradeoff in a showcase demo

## Push stack, not carousel

The core state is a **queue of three entries**, not a modular index into four fixed cards.

```ts
type StackEntry = { key: string; toast: Toast };

const [stack, setStack] = useState<StackEntry[]>(initialStack);

function pushToast() {
  const toast = TOAST_SEQUENCE[sequenceIndex % TOAST_SEQUENCE.length];
  const key = `${toast.id}-${pushCounter.current++}`;

  setStack((current) => [
    { key, toast },                        // enters at front
    ...current.slice(0, VISIBLE_COUNT - 1), // previous front/middle shift back
  ]);                                      // previous back exits via AnimatePresence
}
```

Each entry gets a unique `key` so Motion can track enter, shift, and exit independently.

**Position** drives transform — front at top, back cards fall **down**:

```ts
function slotStyle(position: number) {
  const y = position * 26;
  const scale = 1 - position * 0.052;

  return {
    opacity: position === 0 ? 1 : position === 1 ? 0.76 : 0.5,
    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
    filter: position === 1 ? "blur(0.5px)" : position >= 2 ? "blur(1px)" : "none",
    zIndex: 30 - position,
  };
}
```

Note `translate3d` — explicit GPU layer. `transformOrigin: center top` anchors the stack from above, matching how the OG reads.

**Enter** from above (new toast drops in):

```ts
initial: {
  opacity: 0,
  transform: "translate3d(0, -44px, 0) scale(0.97)",
}
```

**Exit** downward (oldest toast at the back):

```ts
exit: {
  opacity: 0,
  transform: "translate3d(0, 64px, 0) scale(0.9)",
}
```

Wrap the stack in `AnimatePresence` so the exiting card animates out instead of vanishing.

## Glass surfaces without hard borders

Dark glass on pure `#000` only works if the card is **translucent**, not opaque. The OG uses semi-transparent fill + heavy `backdrop-filter` + a hairline top highlight — not a lifted gray gradient or off-black canvas.

```ts
background: "rgba(30, 30, 32, 0.78)",
backdropFilter: "blur(32px) saturate(1.2)",
boxShadow: [
  "0 0 0 1px rgba(255, 255, 255, 0.09)",
  "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
  "0 16px 48px rgba(0, 0, 0, 0.55)",
].join(", "),
```

Back cards in the stack also carry **heavy blur** (`2px` / `5px`) — that's what sells depth in the OG frames, not just opacity falloff.

## Timing that matches the OG clip

The original is ~8 seconds with ~1.7–2 seconds between pushes. Motion should read clearly without dragging.

| Phase | Duration | Easing |
| --- | --- | --- |
| **Push** (existing cards shift back) | `520ms` | `cubic-bezier(0.32, 0.72, 0, 1)` — iOS drawer curve |
| **Enter** (new card from above) | `560ms` | `cubic-bezier(0.23, 1, 0.32, 1)` — strong ease-out |
| **Exit** (back card leaves) | `420ms` | drawer curve |
| **Interval** between pushes | `1700ms` | — |

An earlier pass used `780ms` tweens — closer in spirit but too sluggish on loop. The OG is cinematic, not sleepy. If it feels slow, shorten the tween before touching the interval.

## Avatars with type badges

In the OG, every notification type shows an avatar. The type is communicated by a small badge on the avatar's bottom-right corner — green repost, pink heart, white follow plus, blue DM dot.

v1 only showed an avatar on DMs and used standalone icons for repost/like. That was a layout miss, not just a motion one. Matching the badge pattern makes each card read faster and aligns with the reference frames.

## Accessibility

```ts
const reduced = useReducedMotion() ?? false;
```

When reduced motion is on:

- Stack offsets shrink (`-10px` instead of `-30px`)
- Animated blur is removed
- Push interval slows to `3.2s`

The full viewport button has `aria-label="Show next toast"`. Reduced motion means gentler motion, not zero feedback.

## What I deliberately did not build

This is a motion study, not a toast library.

- **No Sonner integration** — different problem (queuing, swipe, pause-on-hover)
- **No swipe-to-dismiss** — next craft layer if this shipped for real
- **No pixel-perfect clone** — same choreography and timing, different usernames
- **No local avatars** — X pfps via [unavatar](https://unavatar.io), The Weeknd via Spotify CDN

## Conclusion

The first version failed because I optimized for "toast component" patterns when the reference is a **motion study**. Carousels shuffle; push stacks breathe. Fast springs snap; slow tweens glide.

The fixes that mattered most, in order:

1. Push stack with `AnimatePresence` enter/exit
2. Three visible cards, not four
3. **Top-anchored stack** — enter from above, exit downward
4. **Translucent glass on `#000`** — not opaque fill or off-black canvas
5. ~520ms tween + 1.7s interval
6. Avatar badges on every type

The live demo is at **[animations.glamboyosa/13](https://animations.glamboyosa/13)**. Record it next to [Benji's original](https://x.com/benjitaylor/status/2069168413306667353) and compare frame by frame. The difference should be timing and choreography, not "why does mine feel cheap."

---

*osa · [animations.glamboyosa](https://animations.glamboyosa) · [blog.glamboyosa.xyz](https://blog.glamboyosa.xyz)*
