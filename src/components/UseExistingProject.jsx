import React, { useState, useEffect } from "react";
import "@fontsource/roboto/100.css";
import "/src/App.css";
import { IconPlus } from "@tabler/icons-react";

function UseExistingProject() {
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    tag: "javascript",
    files: [
      {
        name: "",
        dateCreated: "",
        dateModified: "",
      },
    ],
  });

  const [fileName, setFileName] = useState("");
  const [optionEnabled, setOptionEnabled] = useState(false);
  const [updatedProject, setUpdatedProject] = useState(null);
  const [existingProjects, setExistingProjects] = useState([
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
  ]);

  const createProject = () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    let updatedProjects = [];

    if (optionEnabled) {
      // Update existing project
      updatedProjects = existingProjects.map((project) => {
        if (project.name === projectDetails.projectName) {
          const updatedProject = {
            ...project,
            tag: projectDetails.tag, // Use the updated tag
            files: project.files.map((file) =>
              file.name === projectDetails.files.name
                ? { ...file, dateModified: currentDate }
                : file
            ),
          };
          setUpdatedProject(updatedProject); // Set the updated project for later use
          return updatedProject;
        }
        return project;
      });
    } else {
      const newProject = {
        name: projectDetails.projectName,
        tag: projectDetails.tag,
        files: projectDetails.files.map((file) => ({
          ...file,
          dateCreated: currentDate,
          dateModified: currentDate,
        })),
      };
      updatedProjects = [...existingProjects, newProject];
      setUpdatedProject(newProject); // Set the new project for later use
    }
    setExistingProjects(updatedProjects);
  };

  useEffect(() => {
    if (updatedProject) {
      console.log("Updated Project: ", updatedProject);
    }
  }, [updatedProject]);

  const handleProjectChange = (e) => {
    const selectedProject = e.target.value;
    if (selectedProject === "new") {
      setOptionEnabled(false);
      setProjectDetails((prev) => ({
        ...prev,
        projectName: "", // Reset project name
        files: [
          {
            name: "",
            dateCreated: "",
            dateModified: "",
          },
        ], // Reset files array
      }));
    } else {
      setOptionEnabled(true);
      const project = existingProjects.find(
        (project) => project.name === selectedProject
      );

      // Update projectDetails with the selected project's details
      setProjectDetails({
        projectName: project.name,
        tag: project.tag, // Keep the selected tag
        files: project.files, // Set the files from the selected project
      });
    }
  };

  const handleAddFile = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (fileName.trim()) {
      if (optionEnabled) {
        // Update existingProjects and projectDetails
        setExistingProjects((prevProjects) => {
          return prevProjects.map((project) => {
            if (project.name === projectDetails.projectName) {
              const updatedFiles = [
                ...project.files,
                {
                  name: fileName,
                  dateCreated: currentDate,
                  dateModified: currentDate,
                },
              ];
              setProjectDetails((prevDetails) => ({
                ...prevDetails,
                files: updatedFiles,
              }));
              return { ...project, files: updatedFiles };
            }
            return project;
          });
        });
      } else {
        // Add the file to the projectDetails as an object with dates
        setProjectDetails((prev) => ({
          ...prev,
          files: [
            ...prev.files,
            {
              name: fileName,
              dateCreated: currentDate,
              dateModified: currentDate,
            },
          ],
        }));
      }
      setFileName("");
    }
  };
  return (
    <div className="bg-[#1e1c1cdb] px-4 mx-2 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-sm relative min-h-96 max-h-[500px] overflow-y-auto">
      <h1
        className="title-font sm:text-2xl text-[18px]  mb-3 pt-6 fontChange"
        style={{ borderBottom: "0.1px solid #C0C0C0" }}
      >
        Create New Project <span className="text-gray-400">||</span> Use
        Existing Project
      </h1>

      <form className="">
        <div className="flex pb-3 justify-end lg:flex-row flex-col lg:items-center align-middle gap-2">
          <div className="sm:w-full">
            <label
              htmlFor="existing-project"
              className="block mb-2 text-sm sm:text-[12px] xl:text-[14px] font-medium text-gray-900 text-left dark:text-[#bcbbbb]"
            >
              Pick Existing Project or Create New
            </label>
            <select
              id="existing-project"
              className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[rgba(30,30,30,255)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#c0cee7] dark:focus:ring-blue-500 dark:focus:border-blue-500 scroll-smooth"
              onChange={handleProjectChange}
            >
              <option value="new" defaultValue={"New Project"}>
                {" "}
                New Project
              </option>
              {existingProjects.map((project, index) => (
                <option key={index} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            {optionEnabled ? (
              <div>
                <label
                  htmlFor="project-files"
                  className="block mb-2 text-sm sm:text-[12px] xl:text-[14px] text-left font-medium dark:text-[#bcbbbb]"
                >
                  Project Files
                </label>
                <select
                  id="project-files"
                  className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[rgba(30,30,30,255)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#c0cee7] dark:focus:ring-blue-500 dark:focus:border-blue-500 scroll-smooth"
                >
                  {projectDetails.files.map((file, index) => (
                    <option key={index} value={file}>
                      {file.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                {" "}
                <label
                  htmlFor="project-name"
                  className="block mb-2 text-sm sm:text-[12px] xl:text-[14px] text-left font-medium dark:text-[#bcbbbb]"
                >
                  New Project Name
                </label>
                <input
                  type="text"
                  id="project-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-[rgba(30,30,30,255)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#c0cee7] dark:focus:ring-blue-300 dark:focus:border-blue-300"
                  placeholder="Enter project name"
                  value={projectDetails.projectName}
                  onChange={(e) =>
                    setProjectDetails((prev) => ({
                      ...prev,
                      projectName: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end lg:flex-row flex-col lg:items-center align-middle gap-2 mt-2">
          <div className="sm:w-full">
            <label
              htmlFor="tag"
              className="block mb-2 text-sm sm:text-[12px] xl:text-[14px] font-medium text-gray-900 text-left dark:text-[#bcbbbb]"
            >
              Pick the tag you want to work
            </label>
            <select
              id="tag"
              className="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[rgba(30,30,30,255)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#c0cee7] dark:focus:ring-blue-500 dark:focus:border-blue-500 scroll-smooth"
              value={projectDetails.tag}
              onChange={(e) =>
                setProjectDetails((prev) => ({
                  ...prev,
                  tag: e.target.value,
                }))
              }
            >
              <option value="javascript">Javascript</option>
              <option value="java">Java</option>
              <option value="webdevelopment">Web Development</option>
              <option value="python">Python</option>
              <option value="go">Go</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col justify-end lg:flex-row lg:items-center align-middle gap-2 mt-2">
          <div className="sm:w-full">
            <label
              htmlFor="new-file-name"
              className="block mb-2 text-sm sm:text-[12px] xl:text-[14px] font-medium text-gray-900 text-left dark:text-[#bcbbbb]"
            >
              {!optionEnabled
                ? "New File Name with Extension"
                : "Add File with Extension"}
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                id="new-file-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-[rgba(30,30,30,255)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-[#c0cee7] dark:focus:ring-blue-300 dark:focus:border-blue-300"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2.5"
                onClick={handleAddFile}
              >
                <IconPlus className="text-blue-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex  gap-2 mt-2">
          {projectDetails.files.length > 0 && (
            <div className="w-full">
              <ul className="mt-3 flex flex-wrap gap-2 text-left dark:text-[#bcbbbb] text-sm sm:text-[12px] xl:text-[14px]">
                {projectDetails.files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-center lg:flex-row flex-col lg:items-center align-middle gap-2 mt-4">
          <button
            type="button"
            onClick={createProject}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            {" "}
            {optionEnabled ? "Update Project" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UseExistingProject;
