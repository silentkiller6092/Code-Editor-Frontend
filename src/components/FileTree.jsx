import React, { useState } from "react";
import {
  getIconForFile,
  getIconForFolder,
  getIconForOpenFolder,
} from "vscode-icons-js"; // Adjust the import path as necessary
import { ScrollArea } from "@mantine/core";
import { IconFolder, IconFile } from "@tabler/icons-react";

const FileTree = () => {
  const fileTreeData = [
    {
      name: "assets",
      type: "folder",
      children: [
        {
          name: "css",
          type: "folder",
          children: [
            { name: "main.css", type: "file" },
            { name: "input.css", type: "file" },
            { name: "theme.css", type: "file" },
          ],
        },
        {
          name: "js",
          type: "folder",
          children: [
            { name: "app.js", type: "file" },
            { name: "vendor.js", type: "file" },
            {
              name: "modules",
              type: "folder",
              children: [
                { name: "auth.js", type: "file" },
                { name: "api.js", type: "file" },
                { name: "dashboard.js", type: "file" },
              ],
            },
          ],
        },
        {
          name: "images",
          type: "folder",
          children: [
            { name: "logo.png", type: "file" },
            { name: "background.jpg", type: "file" },
            {
              name: "icons",
              type: "folder",
              children: [
                { name: "search.svg", type: "file" },
                { name: "user.svg", type: "file" },
                { name: "settings.svg", type: "file" },
              ],
            },
          ],
        },
        {
          name: "fonts",
          type: "folder",
          children: [
            { name: "Roboto-Regular.ttf", type: "file" },
            { name: "OpenSans-Bold.ttf", type: "file" },
          ],
        },
      ],
    },
    {
      name: "config",
      type: "folder",
      children: [
        { name: "webpack.config.js", type: "file" },
        { name: "babel.config.js", type: "file" },
        {
          name: "env",
          type: "folder",
          children: [
            { name: ".env.development", type: "file" },
            { name: ".env.production", type: "file" },
          ],
        },
      ],
    },
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: [
            { name: "Header.js", type: "file" },
            { name: "Footer.js", type: "file" },
            { name: "Sidebar.js", type: "file" },
            {
              name: "common",
              type: "folder",
              children: [
                { name: "Button.js", type: "file" },
                { name: "Input.js", type: "file" },
                { name: "Modal.js", type: "file" },
              ],
            },
          ],
        },
        {
          name: "pages",
          type: "folder",
          children: [
            { name: "Home.js", type: "file" },
            { name: "About.js", type: "file" },
            { name: "Contact.js", type: "file" },
            {
              name: "dashboard",
              type: "folder",
              children: [
                { name: "Overview.js", type: "file" },
                { name: "Reports.js", type: "file" },
                { name: "Analytics.js", type: "file" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "README.md",
      type: "file",
    },
    {
      name: "package.json",
      type: "file",
    },
    {
      name: "yarn.lock",
      type: "file",
    },
  ];

  const FileTreeNode = ({ node, parentPath, isChild }) => {
    const [isOpen, setIsOpen] = useState(true); // Open all nodes by default

    const toggleOpen = () => setIsOpen(!isOpen);
    const currentPath = `${parentPath}/${node.name}`;
    const isFolder = node.type === "folder";

    // Get the appropriate icon for the folder/file
    const icon = isFolder
      ? isOpen
        ? `../../icons/${getIconForOpenFolder(node.name)}`
        : `../../icons/${getIconForFolder(node.name)}`
      : `../../icons/${getIconForFile(node.name)}`;
    console.log(icon);
    return (
      <div className="relative">
        <div
          className={`flex items-center cursor-pointer ${
            isChild ? "pl-4" : ""
          }`}
          onClick={toggleOpen}
        >
          {/* Folder/File Icon */}
          <img src={icon} alt={node.name} className="w-4 h-4 mr-2" />
          {/* Folder/File Name */}
          <span className="font-thin">{node.name}</span>
        </div>

        {isOpen && node.children && Array.isArray(node.children) && (
          <div className="relative flex pl-2">
            {/* Flexbox container for vertical line */}
            <div className="flex justify-center relative w-5">
              {/* Vertical line */}
              <div className="absolute mr-2 top-0 bottom-0 w-px bg-gray-600"></div>
            </div>

            {/* Nested children */}
            <div className="flex flex-col">
              {node.children.map((child, index) => (
                <FileTreeNode
                  key={index}
                  node={child}
                  parentPath={currentPath}
                  isChild={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <ScrollArea className="p-4 scrollbar-thin h-screen">
      {fileTreeData.map((node, index) => (
        <FileTreeNode key={index} node={node} parentPath="" isChild={false} />
      ))}
    </ScrollArea>
  );
};

export default FileTree;
