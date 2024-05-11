"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import useMeasure from "react-use-measure";
import * as Slider from "@radix-ui/react-slider";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Toaster, toast } from "sonner";
import * as Separator from "@radix-ui/react-separator";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Switch from "@radix-ui/react-switch";

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
  const [checked, setChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTabType | null>(null);
  const [shownTab, setShownTab] = useState<ActiveTabType | null>(
    "Create Webhook"
  );
  const [ref, bounds] = useMeasure();
  console.log(bounds);
  const content = useMemo(() => {
    switch (shownTab) {
      case "Create Webhook":
        return (
          <motion.div
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
          >
            <div className="space-y-2 my-3">
              <h2 className="text-[15px]  mb-1">Endpoint</h2>
              <input
                type="text"
                placeholder="https://myapp.com/webhooks"
                className="flex h-9 rounded-md w-full border border-input bg-white dark:bg-black px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 dark:focus-visible:ring-green-400 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2 my-3">
              <h2 className="mb-1 text-[15px]">Projects</h2>
              <form>
                <RadioGroup.Root
                  className="flex gap-2.5"
                  defaultValue="default"
                  aria-label="View density"
                >
                  <div className="flex items-center">
                    <RadioGroup.Item
                      className="bg-white w-[15px] h-[15px] rounded-full ring-1 ring-black/10 outline-none cursor-pointer"
                      value="default"
                      id="r1"
                    >
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-[50%] after:bg-orange-500 dark:after:bg-green-400" />
                    </RadioGroup.Item>
                    <label
                      className=" text-[14px] text-black/60 dark:text-white leading-none pl-[10px]"
                      htmlFor="r1"
                    >
                      All Team Projects in{" "}
                      <span className="p-1 rounded-md bg-stone-100 text-orange-500 dark:text-green-400">
                        acme
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroup.Item
                      className="bg-white w-[15px] h-[15px] rounded-full ring-1 ring-black/10 outline-none cursor-pointer"
                      value="comfortable"
                      id="r2"
                    >
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-[50%] after:bg-orange-500 dark:after:bg-green-400" />
                    </RadioGroup.Item>
                    <label
                      className="text-[14px] text-black/60 dark:text-white leading-none pl-[10px]"
                      htmlFor="r2"
                    >
                      Tagged Projects
                    </label>
                  </div>
                </RadioGroup.Root>
              </form>
            </div>
            <div className="space-y-2 my-3">
              <h2 className="font-lg  mb-1">Events</h2>
              <form className=" bg-zinc-100 rounded-md p-4 flex justify-start gap-2">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center">
                    <Checkbox.Root
                      className=" flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none"
                      defaultChecked
                      id="c1"
                    >
                      <Checkbox.Indicator className="text-orange-500 dark:text-green-400">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label
                      className="pl-[10px] text-[14px] text-black/60 dark:text-white leading-none"
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
                      <Checkbox.Indicator className="text-orange-500 dark:text-green-400">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label
                      className="pl-[10px] text-[14px] text-black/60 dark:text-white leading-none"
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
                      <Checkbox.Indicator className="text-orange-500 dark:text-green-400">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label
                      className="pl-[10px] text-[14px] text-black/60 dark:text-white leading-none"
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
                      <Checkbox.Indicator className="text-orange-500 dark:text-green-400">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label
                      className="pl-[10px] text-[14px] text-black/60 dark:text-white leading-none"
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
                      <Checkbox.Indicator className="text-orange-500 dark:text-green-400">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label
                      className="pl-[10px] text-[14px] text-black/60 dark:text-white leading-none"
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
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
          >
            <h2 className="text-[15px] ml-1 mt-1.5 mb-2.5">
              Connect Repositories to{" "}
              <span className="p-1 rounded-md bg-stone-100 text-orange-500 dark:text-green-400">
                acme
              </span>
            </h2>
            <form className="rounded-md  flex justify-start gap-2">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center">
                  <Checkbox.Root
                    className=" flex h-[20px] w-[20px] border border-black/10 appearance-none items-center justify-center rounded-[4px] bg-white outline-none"
                    id="c1"
                  >
                    <Checkbox.Indicator className="text-orange-500 dark:text-green-400">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label
                    className="pl-[10px] text-[14px] text-black/60 dark:text-white leading-none"
                    htmlFor="c1"
                  >
                    acme-homepage
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox.Root
                    className=" flex h-[20px] w-[20px] border border-black/10 appearance-none items-center justify-center rounded-[4px] bg-white outline-none"
                    id="c1"
                  >
                    <Checkbox.Indicator className="text-orange-500 dark:text-green-400">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label
                    className="pl-[10px] text-[14px]  text-black/60 dark:text-white leading-none"
                    htmlFor="c1"
                  >
                    prisma-test
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox.Root
                    className=" flex h-[20px] w-[20px] border border-black/10 appearance-none items-center justify-center rounded-[4px] bg-white outline-none"
                    id="c1"
                  >
                    <Checkbox.Indicator className="text-orange-500 dark:text-green-400">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label
                    className="pl-[10px] text-[14px] text-black/60 dark:text-white leading-none"
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
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
          >
            <h2 className="text-[15px] ml-1 mt-1.5 mb-2.5">
              Create new API key
            </h2>
            <p className="mb-2 text-sm text-pretty">
              Your secret API Key will be shared with all users belonging to
              your
              <span className="p-1 rounded-md bg-stone-100 text-orange-500 dark:text-green-400">
                acme
              </span>
              organization
            </p>
            <form className="rounded-md mb-2 flex justify-start gap-2">
              <input
                type="text"
                placeholder="https://myapp.com/webhooks"
                className="flex h-9 rounded-md w-full border border-input bg-white dark:bg-black px-2 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 dark:focus-visible:ring-green-400 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </form>
          </motion.div>
        );
      default:
        return (
          <motion.div
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
          >
            <div className="flex items-center">
              <h2 className="text-[15px] ml-1 mt-1.5 mb-2.5">Sharing is off</h2>
              <Switch.Root
                checked={checked}
                onCheckedChange={(checked) => setChecked(checked)}
                className="w-[35px] h-[18px] ml-auto bg-gray-100 rounded-full relative dark:data-[state=checked]:bg-green-300 data-[state=checked]:bg-orange-400 outline-none cursor-pointer"
                id="airplane-mode"
              >
                <Switch.Thumb className="block w-[14px] h-[14px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
            </div>
            <AnimatePresence mode="popLayout" initial={false}>
              {!checked ? (
                <motion.p
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(5px)" }}
                  className="mb-2 text-sm text-pretty"
                >
                  To share your workspace with other people you need to publish
                  it first.
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(5px)" }}
                  className="relative mb-2 rounded-md shadow-sm"
                >
                  <input
                    type="text"
                    className="flex h-9 rounded-md w-full border border-input bg-white dark:bg-black px-2 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 dark:focus-visible:ring-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="/amazinglink"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button className="bg-transparent text-sm px-1.5 py-0.5 rounded-md">
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

  return (
    <MotionConfig
      transition={{
        duration: 1.5,
        bounce: 0,
        type: "spring",
      }}
    >
      <motion.div
        animate={{ height: bounds.height }}
        className="flex justify-center items-center h-screen"
      >
        <Toaster />
        <div>
          <div className="flex w-full p-1.5 bg-white flex-col items-center border border-black/30 rounded-xl">
            {shownTab === "Create Webhook" ? (
              <h1 className="text-[15px] ml-2 mt-1 mb-2 place-self-start">
                Create Webhook
              </h1>
            ) : null}

            <div
              ref={ref}
              className="flex border border-black/10 flex-col p-3 w-[500px] rounded-lg bg-stone-50"
            >
              <AnimatePresence mode="popLayout">{content}</AnimatePresence>
              <div className="ml-auto text-sm flex gap-1">
                <button className="bg-transparent text-sm px-1.5 py-0.5 rounded-md hover:bg-stone-200">
                  Cancel
                </button>
                <button className="bg-orange-500 text-white dark:bg-green-200 dark:text-black dark:disabled:bg-green-300 disabled:bg-orange-300 px-2.5 text-sm py-1 rounded-md">
                  {shownTab === "Create API Key"
                    ? "Create Secret Key"
                    : shownTab}
                </button>
              </div>
            </div>

            <div className="flex p-2.5  items-center">
              <div
                className={clsx(
                  "flex items-center scrollContainer w-[408px] overflow-scroll snap-x"
                )}
              >
                {TABS.map((tab) => (
                  <motion.li
                    className={clsx(
                      "relative space-x-4 snap-center text-nowrap whitespace-nowrap cursor-pointer text-stone-600 dark:text-white/80 px-[6.9px] py-1.5 text-sm outline-none transition-colors list-none",
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
      </motion.div>
    </MotionConfig>
  );
};

export default ContextualToolbar;
