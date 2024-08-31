import React from "react";
import { motion } from "framer-motion";

import { Meteors } from "./ui/metoros";
// Supports weights 300-700
import "@fontsource-variable/comfortaa";
import { TextGenerateEffectDemo } from "./TextGeneration";
export default function GlobeDemo() {
  return (
    <div className="flex flex-row pt-14 py-0 md:py-16 md:pt-0 items-center align-middle h-full fixed md:h-screen dark:bg-[rgba(30,30,30,255)] bg-white md:relative w-full">
      <div className="max-w-7xl pt-0 md:py-10 mx-auto w-full justify-center relative overflow-hidden h-screen md:h-[40rem]">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="text-left md:text-center"
        >
          <div className="absolute mt-3 flex flex-col items-center w-full h-[22rem] md:h-[28rem] z-10">
            <Meteors number={30} />
          </div>

          <h2 className="text-left md:text-center mt-14 text-5xl sm:text-6xl md:text-7xl mx-4 homeTitle">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Build Software
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Faster
            </span>
          </h2>

          <div className="text-left md:text-center">
            <TextGenerateEffectDemo />
          </div>
        </motion.div>
        <div className="flex justify-center md:mt-32 mt-24 md:mx-28 ">
          <button
            type="button"
            class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 z-20"
          >
            <span className="text-xl"> Sign up for Free</span>
          </button>
          <button
            class="rounded-md bg-amber-800 py-2.5 px-5 me-2 mb-2  border border-transparent text-center text-xl text-slate-300 transition-all shadow-md hover:shadow-lg focus:bg-amber-700 focus:shadow-none active:bg-amber-700 hover:bg-amber-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 z-20"
            type="button"
          >
            Get Start Now
          </button>
        </div>
      </div>
    </div>
  );
}
