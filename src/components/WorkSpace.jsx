import React, { useState } from "react";
import "@fontsource/roboto/100.css";
import "/src/App.css";

import UseExistingProject from "./UseExistingProject";
import FolderStrcuture from "./FolderStrcuture";
import AllProjectUserWorked from "./AllProjectUserWorked";

function WorkSpace() {
  return (
    <div className="container relative z-10 lg:px-5 mt-3 px-2  grid sm:grid-cols-2 grid-cols-1 md:gap-10">
      <div className="h-full py-4 px-2 sm:w-full">
        <FolderStrcuture />
      </div>

      <div className="h-full py-4 sm:w-full">
        <UseExistingProject />
      </div>
      <div className="h-full py-4 sm:w-full md:mx-0 mx-3">
        <AllProjectUserWorked />
      </div>
    </div>
  );
}

export default WorkSpace;
