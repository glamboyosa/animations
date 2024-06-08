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
    <div className="p-20 translate-x-56 h-screen overflow-hidden">
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
        <div className="w-5/6 h-96 ml-4  relative">
          <Image
            width={1920} // Original image width
            height={1080} // Original image height
            alt=""
            loading="eager"
            quality={100}
            className="rounded-xl object-cover"
            src="/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash.jpg"
          ></Image>
          <div className="absolute inset-0">
            <div className="flex  items-center justify-start p-2">
              <div className="rounded-2xl text-white bg-gray-500 px-3 py-2 text-xs flex items-center justify-center">
                Superhost
              </div>
              <svg
                className=" ml-auto mr-1"
                width="25"
                height="25"
                viewBox="0 0 15 15"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                  fill="red"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex items-start justify-center mt-4">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-lg font-semiBold tracking-tight">
                Home in Bo Phut, Thailand
              </h3>
              <p className="text-sm text-black/40 tracking-tighter">
                Manee10Villa 3 bedrooms
              </p>
              <p className="text-sm text-black/40 tracking-tighter">
                3 beds. 3 bedrooms
              </p>
            </div>
            <div className="flex ml-auto mr-1 items-center gap-1">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
                  fill="currentColor"
                ></path>
              </svg>
              <p className="text-lg font-light">5.0</p>
            </div>
          </div>
          <div className="my-4 bg-stone-100 shadow-xl shadow-black/5 rounded-lg p-4 w-11/12">
            <div className="text-black/40 cursor-pointer underline">
              Add Note
            </div>
          </div>
        </div>
        <div className="w-5/6 h-96 ml-4 mt-24 relative">
          <Image
            width={1920} // Original image width
            height={1080} // Original image height
            alt=""
            loading="eager"
            quality={100}
            className="rounded-xl object-cover"
            src="/mike-von-GrfbQPPYguU-unsplash.jpg"
          ></Image>
          <div className="absolute inset-0">
            <div className="flex  items-center justify-start p-2">
              <div className="rounded-2xl text-white bg-gray-500 px-3 py-2 text-xs flex items-center justify-center">
                Superhost
              </div>
              <svg
                className=" ml-auto mr-1"
                width="25"
                height="25"
                viewBox="0 0 15 15"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                  fill="red"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Airbnbsharebookmarks;
