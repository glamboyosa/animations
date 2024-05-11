"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import useMeasure from "react-use-measure";
import * as Slider from "@radix-ui/react-slider";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Toaster, toast } from "sonner";
import * as Separator from "@radix-ui/react-separator";
import "./styles.css";
const TABS = [
  "Create Webhook",
  "Connect Repositories",
  "Create API Key",
  "Share Workspace",
] as const;
type ActiveTabType = (typeof TABS)[number];
const ContextualToolbar = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTabType | null>(null);
  const [shownTab, setShownTab] = useState<ActiveTabType | null>(null);
  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster />
      <div>
        <div className="flex w-auto bg-white border border-black/30 rounded-lg p-2.5 items-center">
          <div className="flex items-center scrollContainer w-[408px] overflow-scroll snap-x">
            {TABS.map((tab) => (
              <motion.li
                className={clsx(
                  "relative space-x-4 snap-center text-nowrap whitespace-nowrap cursor-pointer text-stone-600 dark:text-white/80 px-2 py-1.5 text-sm outline-none transition-colors list-none",
                  activeTab === tab ? "text-black dark:text-white" : null,
                  shownTab === tab ? "text-black dark:text-white" : null
                )}
                tabIndex={0}
                key={tab}
                onFocus={() => setActiveTab(tab)}
                onMouseOver={() => setActiveTab(tab)}
                onMouseLeave={() => setActiveTab(tab)}
                onClick={() => setShownTab(tab)}
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
          </div>
          <div className="flex ml-auto items-center gap-3.5">
            <Separator.Root
              className="bg-stone-200 data-[orientation=vertical]:h-5 data-[orientation=vertical]:w-[1.5px]"
              decorative
              orientation="vertical"
            />
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextualToolbar;
