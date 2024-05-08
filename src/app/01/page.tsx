"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import useMeasure from "react-use-measure";
import * as Slider from "@radix-ui/react-slider";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Toaster, toast } from "sonner";

const TABS = ["Dimensions", "Aspect Ratio", "Prompt"] as const;
const RATIOS = [
  {
    name: "1:1",
    svg: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H1.5H13.5H14V1.5V13.5V14H13.5H1.5H1V13.5V1.5V1ZM2 2V13H13V2H2Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    name: "16:9",
    svg: (
      <svg
        width="24"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H1.5H13.5H14V1.5V13.5V14H13.5H1.5H1V13.5V1.5V1ZM2 2V13H13V2H2Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    name: "21.9",
    svg: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 1.5C2 1.77614 1.77614 2 1.5 2C1.22386 2 1 1.77614 1 1.5C1 1.22386 1.22386 1 1.5 1C1.77614 1 2 1.22386 2 1.5ZM2 5L2 10H13V5H2ZM2 4C1.44772 4 1 4.44772 1 5V10C1 10.5523 1.44772 11 2 11H13C13.5523 11 14 10.5523 14 10V5C14 4.44772 13.5523 4 13 4H2ZM1.5 14C1.77614 14 2 13.7761 2 13.5C2 13.2239 1.77614 13 1.5 13C1.22386 13 1 13.2239 1 13.5C1 13.7761 1.22386 14 1.5 14ZM4 1.5C4 1.77614 3.77614 2 3.5 2C3.22386 2 3 1.77614 3 1.5C3 1.22386 3.22386 1 3.5 1C3.77614 1 4 1.22386 4 1.5ZM3.5 14C3.77614 14 4 13.7761 4 13.5C4 13.2239 3.77614 13 3.5 13C3.22386 13 3 13.2239 3 13.5C3 13.7761 3.22386 14 3.5 14ZM6 1.5C6 1.77614 5.77614 2 5.5 2C5.22386 2 5 1.77614 5 1.5C5 1.22386 5.22386 1 5.5 1C5.77614 1 6 1.22386 6 1.5ZM5.5 14C5.77614 14 6 13.7761 6 13.5C6 13.2239 5.77614 13 5.5 13C5.22386 13 5 13.2239 5 13.5C5 13.7761 5.22386 14 5.5 14ZM8 1.5C8 1.77614 7.77614 2 7.5 2C7.22386 2 7 1.77614 7 1.5C7 1.22386 7.22386 1 7.5 1C7.77614 1 8 1.22386 8 1.5ZM7.5 14C7.77614 14 8 13.7761 8 13.5C8 13.2239 7.77614 13 7.5 13C7.22386 13 7 13.2239 7 13.5C7 13.7761 7.22386 14 7.5 14ZM10 1.5C10 1.77614 9.77614 2 9.5 2C9.22386 2 9 1.77614 9 1.5C9 1.22386 9.22386 1 9.5 1C9.77614 1 10 1.22386 10 1.5ZM9.5 14C9.77614 14 10 13.7761 10 13.5C10 13.2239 9.77614 13 9.5 13C9.22386 13 9 13.2239 9 13.5C9 13.7761 9.22386 14 9.5 14ZM12 1.5C12 1.77614 11.7761 2 11.5 2C11.2239 2 11 1.77614 11 1.5C11 1.22386 11.2239 1 11.5 1C11.7761 1 12 1.22386 12 1.5ZM11.5 14C11.7761 14 12 13.7761 12 13.5C12 13.2239 11.7761 13 11.5 13C11.2239 13 11 13.2239 11 13.5C11 13.7761 11.2239 14 11.5 14ZM14 1.5C14 1.77614 13.7761 2 13.5 2C13.2239 2 13 1.77614 13 1.5C13 1.22386 13.2239 1 13.5 1C13.7761 1 14 1.22386 14 1.5ZM13.5 14C13.7761 14 14 13.7761 14 13.5C14 13.2239 13.7761 13 13.5 13C13.2239 13 13 13.2239 13 13.5C13 13.7761 13.2239 14 13.5 14Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    name: "3:4",
    svg: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 1.5C2 1.77614 1.77614 2 1.5 2C1.22386 2 1 1.77614 1 1.5C1 1.22386 1.22386 1 1.5 1C1.77614 1 2 1.22386 2 1.5ZM5 13H10V2L5 2L5 13ZM4 13C4 13.5523 4.44772 14 5 14H10C10.5523 14 11 13.5523 11 13V2C11 1.44772 10.5523 1 10 1H5C4.44772 1 4 1.44771 4 2V13ZM13.5 2C13.7761 2 14 1.77614 14 1.5C14 1.22386 13.7761 1 13.5 1C13.2239 1 13 1.22386 13 1.5C13 1.77614 13.2239 2 13.5 2ZM2 3.5C2 3.77614 1.77614 4 1.5 4C1.22386 4 1 3.77614 1 3.5C1 3.22386 1.22386 3 1.5 3C1.77614 3 2 3.22386 2 3.5ZM13.5 4C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3C13.2239 3 13 3.22386 13 3.5C13 3.77614 13.2239 4 13.5 4ZM2 5.5C2 5.77614 1.77614 6 1.5 6C1.22386 6 1 5.77614 1 5.5C1 5.22386 1.22386 5 1.5 5C1.77614 5 2 5.22386 2 5.5ZM13.5 6C13.7761 6 14 5.77614 14 5.5C14 5.22386 13.7761 5 13.5 5C13.2239 5 13 5.22386 13 5.5C13 5.77614 13.2239 6 13.5 6ZM2 7.5C2 7.77614 1.77614 8 1.5 8C1.22386 8 1 7.77614 1 7.5C1 7.22386 1.22386 7 1.5 7C1.77614 7 2 7.22386 2 7.5ZM13.5 8C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7C13.2239 7 13 7.22386 13 7.5C13 7.77614 13.2239 8 13.5 8ZM2 9.5C2 9.77614 1.77614 10 1.5 10C1.22386 10 1 9.77614 1 9.5C1 9.22386 1.22386 9 1.5 9C1.77614 9 2 9.22386 2 9.5ZM13.5 10C13.7761 10 14 9.77614 14 9.5C14 9.22386 13.7761 9 13.5 9C13.2239 9 13 9.22386 13 9.5C13 9.77614 13.2239 10 13.5 10ZM2 11.5C2 11.7761 1.77614 12 1.5 12C1.22386 12 1 11.7761 1 11.5C1 11.2239 1.22386 11 1.5 11C1.77614 11 2 11.2239 2 11.5ZM13.5 12C13.7761 12 14 11.7761 14 11.5C14 11.2239 13.7761 11 13.5 11C13.2239 11 13 11.2239 13 11.5C13 11.7761 13.2239 12 13.5 12ZM2 13.5C2 13.7761 1.77614 14 1.5 14C1.22386 14 1 13.7761 1 13.5C1 13.2239 1.22386 13 1.5 13C1.77614 13 2 13.2239 2 13.5ZM13.5 14C13.7761 14 14 13.7761 14 13.5C14 13.2239 13.7761 13 13.5 13C13.2239 13 13 13.2239 13 13.5C13 13.7761 13.2239 14 13.5 14Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    name: "4.3",
    svg: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 2H2.5C2.22386 2 2 2.22386 2 2.5V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V2.5C13 2.22386 12.7761 2 12.5 2ZM2.5 1C1.67157 1 1 1.67157 1 2.5V12.5C1 13.3284 1.67157 14 2.5 14H12.5C13.3284 14 14 13.3284 14 12.5V2.5C14 1.67157 13.3284 1 12.5 1H2.5Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    name: "Custom",
    svg: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    ),
  },
] as const;
type ARActiveTabType = (typeof RATIOS)[number]["name"];
type ActiveTabType = (typeof TABS)[number];

const One = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTabType>("Dimensions");
  const [ARActiveTab, setARActiveTab] = useState<ARActiveTabType>("1:1");

  const [vertical, setVertical] = useState([50]);
  const [horizontal, setHorizontal] = useState([50]);
  const [upscale, setUpscale] = useState([50]);
  const content = useMemo(() => {
    switch (activeTab) {
      case "Dimensions":
        return (
          <motion.div
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            className="space-y-0.5"
          >
            <div className="flex justify-between p-1 items-center">
              <p className="text-sm hover:text-white text-stone-400">
                Vertical
              </p>
              <div className="flex gap-2">
                <div className="bg-stone-800  rounded-sm">
                  <p className="text-xs text-white p-1.5">{vertical[0]}</p>
                </div>
                <Slider.Root
                  value={vertical}
                  onValueChange={(value) => setVertical(value)}
                  className="relative flex items-center select-none touch-none w-[100px] h-5"
                  defaultValue={[50]}
                  max={100}
                  step={1}
                >
                  <Slider.Track className="bg-black/5 relative grow rounded-full h-[3px]">
                    <Slider.Range className="absolute bg-stone-600 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-3 h-3 bg-white/75 shadow-[0_2px_10px]  rounded-full hover:bg-white focus:outline-none focus:shadow-[0_0_0_5px]"
                    aria-label="Volume"
                  />
                </Slider.Root>
              </div>
            </div>
            <div className="flex p-1 justify-between items-center">
              <p className="text-sm hover:text-white text-stone-400">
                Horizontal
              </p>
              <div className="flex gap-2">
                <div className="bg-stone-800">
                  <p className="text-xs text-white p-1.5">{horizontal[0]}</p>
                </div>
                <Slider.Root
                  value={horizontal}
                  onValueChange={(value) => setHorizontal(value)}
                  className="relative flex items-center select-none touch-none w-[100px] h-5"
                  defaultValue={[50]}
                  max={100}
                  step={1}
                >
                  <Slider.Track className="bg-black/5 relative grow rounded-full h-[3px]">
                    <Slider.Range className="absolute bg-stone-600 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-3 h-3 bg-white/75 shadow-[0_2px_10px]  rounded-full hover:bg-white focus:outline-none focus:shadow-[0_0_0_5px]"
                    aria-label="Volume"
                  />
                </Slider.Root>
              </div>
            </div>
            <div className="flex p-1 justify-between items-center">
              <p className="text-sm hover:text-white text-stone-400">Upscale</p>
              <div className="flex gap-2">
                <div className="bg-stone-800">
                  <p className="text-xs text-white p-1.5">{upscale[0]}</p>
                </div>
                <Slider.Root
                  value={upscale}
                  onValueChange={(value) => setUpscale(value)}
                  className="relative flex items-center select-none touch-none w-[100px] h-5"
                  defaultValue={[50]}
                  max={100}
                  step={1}
                >
                  <Slider.Track className="bg-black/5 relative grow rounded-full h-[3px]">
                    <Slider.Range className="absolute bg-stone-600 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-3 h-3 bg-white/75 shadow-[0_2px_10px]  rounded-full hover:bg-white focus:outline-none focus:shadow-[0_0_0_5px]"
                    aria-label="Volume"
                  />
                </Slider.Root>
              </div>
            </div>
          </motion.div>
        );
      case "Aspect Ratio":
        return (
          <motion.div
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            className="grid grid-cols-4 items-center"
          >
            {RATIOS.map((ratio) => (
              <div
                key={ratio.name}
                onClick={() => setARActiveTab(ratio.name)}
                className={clsx(
                  " p-0.5 cursor-pointer flex items-center rounded-md gap-1.5 hover:text-yellow-200",
                  ARActiveTab === ratio.name
                    ? "bg-stone-800 text-yellow-200"
                    : "text-stone-400",
                  ratio.name === "Custom" ? "w-full" : "w-3/4"
                )}
              >
                {ratio.svg}
                <p className="text-sm p-1">{ratio.name}</p>
              </div>
            ))}
          </motion.div>
        );
      default:
        return (
          <motion.form
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            className="w-[99%] h-[120px] flex"
          >
            <textarea
              autoFocus
              placeholder="Add a new prompt"
              className="w-full text-white h-full resize-none px-2 py-[6px] bg-transparent placeholder:text-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDFF79]"
              name="prompt"
              id="prompt"
            ></textarea>
          </motion.form>
        );
    }
  }, [activeTab, ARActiveTab, upscale, vertical, horizontal]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster />
      <div>
        <motion.button
          layout
          layoutId="wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            duration: 0.55,
            bounce: 0.3,
          }}
          onClick={() => setOpen(true)}
          className="p-1.5 relative rounded-xl bg-black"
        >
          <span className="flex gap-1 p-2 items-center justify-center text-sm">
            <motion.span className="hover:text-white text-stone-400">
              Add Style
            </motion.span>
            <svg
              width="23"
              height="23"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                fill="#fff"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </motion.button>
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.div
              layoutId="wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                duration: 0.75,
                bounce: 0.5,
              }}
              className="w-96 z-20 absolute top-[34%] right-1/3 rounded-md p-3 bg-black"
            >
              <div className="flex items-center mb-3">
                {TABS.map((tab) => (
                  <motion.li
                    className={clsx(
                      "relative space-x-2 cursor-pointer px-2 py-1 text-sm outline-none transition-colors list-none hover:text-white",
                      activeTab === tab ? "text-white" : "text-stone-400"
                    )}
                    tabIndex={0}
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                  >
                    {activeTab === tab ? (
                      <motion.div
                        layoutId="tab-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 rounded-lg bg-stone-800"
                      />
                    ) : null}
                    <span className="relative text-inherit">{tab}</span>
                  </motion.li>
                ))}
                <motion.svg
                  onClick={() => setOpen(false)}
                  className="ml-auto"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="#fff"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </motion.svg>
              </div>
              <div>
                <MotionConfig
                  transition={{ type: "tween", duration: 0.3, bounce: 0.2 }}
                >
                  {content}
                </MotionConfig>
                <motion.div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-1 items-center">
                    <span className="size-1.5 rounded-full bg-yellow-200"></span>
                    <p className="text-xs text-stone-400">Changes</p>
                  </div>
                  <button
                    onClick={() => {
                      setOpen(false);
                      toast.message("Parameters Saved", {
                        description: "New template created in drafts 🤠",
                      });
                    }}
                    className="text-black bg-yellow-200 p-1.5 text-xs rounded-md"
                  >
                    Apply Changes
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default One;
