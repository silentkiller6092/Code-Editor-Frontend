import React, { useEffect, useState } from "react";
import { Input, CloseButton, Button } from "@mantine/core";
import { Outlet, Link } from "react-router-dom";
import {
  IconWorldWww,
  IconBrandCodesandbox,
  IconFileText,
  IconBrandJavascript,
  IconHtml,
  IconCoffee,
  IconBrandPython,
  IconBrandGolang,
  IconBrandSass,
  IconSearch,
} from "@tabler/icons-react";
import PrivateCodeEditor from "./PrivateCodeEditorSection";

function ProjectTemplate() {
  const [value, setValue] = useState("");

  const projects = [
    {
      name: " HTML CSS JS",
      tag: "Web development",
      files: [
        {
          name: "index.html",
          dateCreated: "2023-07-24",
          dateModified: "2023-08-24",
        },
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
      ],
    },
    {
      name: "Bootstrap ",
      tag: "Web Development",
      files: [
        {
          name: "index.html",
          dateCreated: "2023-07-24",
          dateModified: "2023-08-24",
        },
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
      ],
    },
    // Add other projects as needed
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
      return <IconBrandJavascript className="text-pink-500" />;
    if (file.name.endsWith(".html"))
      return <IconHtml className="text-yellow-500" />;
    if (file.name.endsWith(".css"))
      return <IconBrandSass className="text-blue-500" />;
    if (file.name.endsWith(".py"))
      return <IconBrandPython className="text-green-500" />;
    if (file.name.endsWith(".java"))
      return <IconCoffee className="text-red-500" />;
    return <IconFileText className="text-gray-500" />;
  };

  const filteredProjects = projects.filter((project) => {
    const projectMatches = project.name
      .toLowerCase()
      .includes(value.toLowerCase());
    const filesMatch = project.files.some((file) =>
      file.name.toLowerCase().includes(value.toLowerCase())
    );
    return projectMatches || filesMatch;
  });

  return (
    <div>
      <div className="bg-[#1e1c1cdb] px-5 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-sm relative min-h-96 h-96  overflow-scroll">
        <h1
          className="title-font sm:text-2xl text-xl mb-3 fontChange pt-3"
          style={{ borderBottom: "0.1px solid #C0C0C0" }}
        >
          Project Templates
        </h1>

        <Input
          placeholder="Search Your Project"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          rightSectionPointerEvents="all"
          mt="md"
          mb="md"
          leftSection={<IconSearch />}
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => setValue("")}
              style={{ display: value ? undefined : "none" }}
            />
          }
        />

        <div className="">
          {filteredProjects.map((project, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex  cursor-pointer"
                onClick={() => toggleFolder(index)}
              >
                {openFolders[index] ? (
                  <IconWorldWww className="text-blue-500 " />
                ) : (
                  <IconBrandCodesandbox className="text-blue-500" />
                )}

                <div className="">
                  <span className="font-medium"> {project.name}</span>
                </div>
                <div className="flex-1 flex justify-end items-center    gap-4">
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
                        <Link to={"/template/1/htmlcss"}>
                          <span>{file.name}</span>
                        </Link>
                        <div className="text-right">
                          <div className="flex">
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

export default ProjectTemplate;
