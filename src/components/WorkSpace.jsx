import React, { useState } from "react";
import "@fontsource/roboto/100.css";
import "/src/App.css";

import UseExistingProject from "./UseExistingProject";
import FolderStrcuture from "./FolderStrcuture";
import AllProjectUserWorked from "./AllProjectUserWorked";
import ProjectTemplate from "./ProjectTemplate";
import { LayoutGridDemo } from "./WorkSpace-Items";

function WorkSpace() {
  return (
    // <div className="container bg-black relative z-10 lg:px-5 mx-auto mt-3 px-2  grid sm:grid-cols-2 grid-cols-1 md:gap-10">
    <div>
      {/* <div className="h-full py-4 px-2 sm:w-full">
        <FolderStrcuture />
      </div>

      <div className="h-full py-4 sm:w-full">
        <UseExistingProject />
      </div>
      <div className="h-full py-4 sm:w-full md:mx-0 mx-3">
        <AllProjectUserWorked />
      </div>
      <div className="h-full py-4 sm:w-full md:mx-0 mx-3">
        <ProjectTemplate />
      </div> */}
      <LayoutGridDemo />
    </div>
  );
}

export default WorkSpace;
