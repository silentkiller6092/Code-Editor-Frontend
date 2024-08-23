import React, { useState } from "react";
import "@fontsource/roboto/100.css";
import "/src/App.css";

import UseExistingProject from "./UseExistingProject";

function WorkSpace() {
  return (
    <div className="container relative z-10 lg:px-5 mt-3 px-2 mx-auto grid sm:grid-cols-2 grid-cols-1 md:gap-10">
      <div className="h-full py-4 px-2 sm:w-full">
        <div className="bg-[#1e1c1cdb] px-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-sm relative min-h-96">
          <h1 className="title-font sm:text-2xl text-xl mb-3 fontChange">
            Most Recent Project You worked on
          </h1>
        </div>
      </div>

      <div className="h-full py-4 sm:w-full">
        <UseExistingProject />
      </div>
    </div>
  );
}

export default WorkSpace;
