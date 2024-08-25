import React, { useState } from "react";
import {
  IconFolder,
  IconFolderOpen,
  IconFileText,
  IconBrandGolang,
  IconFileCode,
} from "@tabler/icons-react";

function FolderStructure() {
  const projects = [
    {
      name: "Project A",
      tag: "javascript",
      files: [
        {
          name: "index.js",
          dateCreated: "2023-07-24",
          dateModified: "2023-08-24",
        },
        {
          name: "style.css",
          dateCreated: "2023-08-24",
          dateModified: "2023-08-24",
        },
        {
          name: "style",
          dateCreated: "2023-08-24",
          dateModified: "2023-08-24",
        },
        {
          name: "style",
          dateCreated: "2023-08-24",
          dateModified: "2023-08-24",
        },
        {
          name: "style",
          dateCreated: "2023-08-24",
          dateModified: "2023-08-24",
        },
        {
          name: "style",
          dateCreated: "2023-08-24",
          dateModified: "2023-08-24",
        },
        {
          name: "style",
          dateCreated: "2023-08-24",
          dateModified: "2023-08-24",
        },
      ],
    },
    {
      name: "Project B",
      tag: "javascript",
      files: [
        {
          name: "app.js",
          dateCreated: "2023-08-24",
          dateModified: "2023-08-24",
        },
        {
          name: "main.css",
          dateCreated: "2023-08-24",
          dateModified: "2023-08-24",
        },
      ],
    },
  ];

  const [openFolders, setOpenFolders] = useState(
    new Array(projects.length).fill(true)
  );

  const toggleFolder = (index) => {
    const updatedOpenFolders = [...openFolders];
    updatedOpenFolders[index] = !updatedOpenFolders[index];
    setOpenFolders(updatedOpenFolders);
  };

  const getFileIcon = (file) => {
    if (file.name.endsWith(".go"))
      return <IconBrandGolang className="text-gray-500" />;
    if (file.name.endsWith(".js"))
      return <IconFileCode className="text-yellow-500" />;
    if (file.name.endsWith(".css"))
      return <IconFileText className="text-blue-500" />;
    return <IconFileText className="text-gray-500" />;
  };

  return (
    <div>
      <div className="bg-[#1e1c1cdb] px-5 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-sm relative min-h-96 h-96  overflow-scroll">
        <h1
          className="title-font sm:text-2xl text-xl mb-3 fontChange pt-3"
          style={{ borderBottom: "0.1px solid #C0C0C0" }}
        >
          Most Recent Projects You Worked
        </h1>

        <div className="">
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              {/* Project Folder */}
              <div
                className="flex  cursor-pointer"
                onClick={() => toggleFolder(index)}
              >
                {openFolders[index] ? (
                  <IconFolderOpen className="text-blue-500 " />
                ) : (
                  <IconFolder className="text-blue-500" />
                )}

                <div className="">
                  <span className="font-medium">{project.name}</span>
                </div>
                <div className="flex-1 flex justify-end items-center    gap-4">
                  <span className="block text-[#a3c9cc]">Created On</span>
                  <span className="block text-[#a3c9cc]">Modified On</span>
                </div>
              </div>

              {openFolders[index] && (
                <div className="ml-6 mt-2">
                  {/* Files inside the folder */}
                  {project.files.map((file, fileIndex) => (
                    <div
                      key={fileIndex}
                      className="flex items-center space-x-2"
                    >
                      {getFileIcon(file)}
                      <div className="flex-1 flex justify-between items-center">
                        <span>{file.name}</span>
                        <div className="text-right">
                          <div className="flex">
                            <span className="block mr-6">
                              {file.dateCreated}
                            </span>
                            <span className="block">{file.dateModified}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FolderStructure;
