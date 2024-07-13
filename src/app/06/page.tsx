"use client";
import { cn } from "@/_lib/utils";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState } from "react";
const variants = {
  exit: { y: 40, filter: "blur(2px)", scale: 0.9, opacity: 0 },
};
const Six = () => {
  const [status, setStatus] = useState<"default" | "sending" | "transfered">(
    "default"
  );
  const calculateHandler = () => {
    setStatus("sending");
    setTimeout(() => {
      setStatus("transfered");
    }, 2000);
    setTimeout(() => {
      setStatus("default");
    }, 3000);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-stone-100 border border-stone-300 rounded-md w-1/3 h-1/2 flex justify-center items-center flex-col gap-24">
        <MotionConfig transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
          <div className="relative text-sm w-full flex flex-col items-center justify-center">
            <span>checkout the GitHub repo</span>
            <motion.div className="bg-white absolute top-0 flex z-20 flex-col items-center justify-center border border-black/10 rounded-md shadow-sm gap-2 p-3.5 w-3/4 h-40">
              <h2 className="font-bold text-lg">Transfered</h2>
              <span className="flex  items-center gap-1 bg-green-200 rounded-lg w-fit px-2 py-0.5 text-green-600">
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
                <p>You are $6000M richer</p>
              </span>
            </motion.div>
            <AnimatePresence>
              {status === "sending" || status === "default" ? (
                <motion.div
                  variants={variants}
                  exit="exit"
                  className="bg-white absolute top-1 z-30 flex flex-col items-center justify-center border border-black/10 rounded-md shadow-sm gap-2 p-3.5 w-3/4 h-40"
                >
                  <h2 className="font-bold text-lg">Check your bank</h2>
                  <span className="flex  items-center gap-1 bg-blue-50 rounded-lg w-fit px-2 py-0.5 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="animate-spin"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <p>Sending</p>
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <AnimatePresence>
              {status === "default" ? (
                <motion.div
                  variants={variants}
                  exit="exit"
                  className="bg-white absolute flex flex-col gap-8 top-2.5 z-50 border border-black/10 rounded-md shadow-sm  p-3.5 w-3/4 h-40"
                >
                  <div className="flex items-center">
                    <span className="text-gray-700">ASK</span>
                    <span className="ml-auto text-gray-300">
                      We don&apos;t ask anything
                    </span>
                  </div>
                  <p className="text-2xl text-center font-extrabold">$6000M</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </MotionConfig>
        <button
          onClick={calculateHandler}
          disabled={status !== "default"}
          className={cn(
            "p-3 mt-20 w-1/3 text-white bg-black hover:text-white/70 rounded-md text-sm hover:bg-black/80 disabled:bg-black/80 disabled:text-white/80"
          )}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default Six;
