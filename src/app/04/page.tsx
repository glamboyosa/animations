"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
const images = [
  "andrea-davis-IWfe63thJxk-unsplash.jpg",
  "karsten-winegeart-sStahKEhT9w-unsplash.jpg",
  "meritt-thomas-_YxDGcDm4Hs-unsplash.jpg",
  "roberto-nickson-6FZf3yzuodE-unsplash.jpg",
  "stephen-wheeler-hBh9JbyeCtg-unsplash.jpg",
];
const rotationDegrees = [10, -20, -5, 5, 2];
const variants = {
  initial: () => ({
    opacity: 0,
    scale: 0,
  }),
  animate: (index: number) => ({
    opacity: 1,
    scale: 1,
    rotate: rotationDegrees[index],
  }),
  transition: (index: number) => ({
    delay: index * 0.15,
    type: "spring",
    bounce: 0.6,
    bounceDamping: 10,
    bounceStiffness: 40,
    duration: 0.5,
  }),
};
const Airbnbsharebookmarks = () => {
  const [play, setPlaying] = useState<"not-playing" | "playing">("playing");

  return (
    <div className="p-20 translate-x-56 h-screen ">
      <div
        style={{
          height: `calc(100vh - 80px)`,
        }}
        className="max-w-xl p-8   shadow-black/30 shadow-lg rounded-md bg-white"
      >
        <div className="flex m-4 items-center gap-2">
          <button className="rounded-2xl px-3.5 py-2.5 border-black border-2  flex items-center gap-0.5">
            <span className="text-xs tracking-tighter">Dates .</span>
            <span className="text-xs tracking-tighter">4 guests</span>
          </button>
          <button className="rounded-2xl px-3.5 py-2.5 border-black/5 border flex items-center gap-1.5">
            <span className="text-xs tracking-tighter">Share</span>
            <span className="text-xs tracking-tighter">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 5.00006C3.22386 5.00006 3 5.22392 3 5.50006L3 11.5001C3 11.7762 3.22386 12.0001 3.5 12.0001L11.5 12.0001C11.7761 12.0001 12 11.7762 12 11.5001L12 5.50006C12 5.22392 11.7761 5.00006 11.5 5.00006L10.25 5.00006C9.97386 5.00006 9.75 4.7762 9.75 4.50006C9.75 4.22392 9.97386 4.00006 10.25 4.00006L11.5 4.00006C12.3284 4.00006 13 4.67163 13 5.50006L13 11.5001C13 12.3285 12.3284 13.0001 11.5 13.0001L3.5 13.0001C2.67157 13.0001 2 12.3285 2 11.5001L2 5.50006C2 4.67163 2.67157 4.00006 3.5 4.00006L4.75 4.00006C5.02614 4.00006 5.25 4.22392 5.25 4.50006C5.25 4.7762 5.02614 5.00006 4.75 5.00006L3.5 5.00006ZM7 1.6364L5.5682 3.0682C5.39246 3.24393 5.10754 3.24393 4.9318 3.0682C4.75607 2.89246 4.75607 2.60754 4.9318 2.4318L7.1818 0.181802C7.26619 0.09741 7.38065 0.049999 7.5 0.049999C7.61935 0.049999 7.73381 0.09741 7.8182 0.181802L10.0682 2.4318C10.2439 2.60754 10.2439 2.89246 10.0682 3.0682C9.89246 3.24393 9.60754 3.24393 9.4318 3.0682L8 1.6364L8 8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5L7 1.6364Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="w-5/6 h-96 ml-4">
          <Image
            width={100}
            height={100}
            alt=""
            loading="eager"
            quality={100}
            className="w-full h-full rounded-xl object-cover"
            src="/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash.jpg"
          ></Image>
        </div>
      </div>
    </div>
  );
};
export default Airbnbsharebookmarks;
