import React, { useState } from "react";
import { Tabs, Button, TextInput, Tooltip, rem } from "@mantine/core";
import classes from "../Style/Demo.module.css";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandJavascript,
  IconHtml,
  IconPlayerPlay,
  IconBrandPython,
  IconBrandGolang,
  IconBrandSass,
  IconDeviceFloppy,
  IconPhoto,
  IconArrowRight,
  IconCoffee,
  IconExternalLink,
  IconFileText,
} from "@tabler/icons-react";
import PrivateEditor from "./templates/PrivateEditor";
import Spinner from "./Spinner";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "../Style/customStyles.css"; // Import custom CSS for thin scrollbar
import CLI from "./CLI";
import FileTree from "./FileTree";
import Output from "./Output";
function PrivateCodeEditorSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const initialFiles = [
    {
      name: "index.html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>`,
    },
    {
      name: "style.css",
      content: "body { font-family: Arial, sans-serif; }",
    },
    {
      name: "index.js",
      content: "console.log('Hello World!');",
    },
  ];

  const [files, setFiles] = useState(initialFiles);
  const [outputCode, setOutputCode] = useState("");
  const [htmlCode, setHtmlCode] = useState(initialFiles[0].content);
  const [cssCode, setCssCode] = useState(initialFiles[1].content);
  const [jsCode, setJsCode] = useState(initialFiles[2].content);
  const [showSpinner, setShowSpinner] = useState(false);
  const [focused, setFocused] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleEditorChange = (index, newValue) => {
    const updatedFiles = [...files];
    updatedFiles[index].content = newValue;
    setFiles(updatedFiles);

    if (updatedFiles[index].name.endsWith(".html")) setHtmlCode(newValue);
    if (updatedFiles[index].name.endsWith(".css")) setCssCode(newValue);
    if (updatedFiles[index].name.endsWith(".js")) setJsCode(newValue);
  };

  const getFileIcon = (file) => {
    if (file.name.endsWith(".go"))
      return (
        <IconBrandGolang
          className="text-gray-500"
          style={{ width: rem(16), height: rem(16) }}
        />
      );
    if (file.name.endsWith(".js"))
      return (
        <IconBrandJavascript
          className="text-yellow-500"
          style={{ width: rem(16), height: rem(16) }}
        />
      );
    if (file.name.endsWith(".html"))
      return (
        <IconHtml
          className="text-pink-500"
          style={{ width: rem(16), height: rem(16) }}
        />
      );
    if (file.name.endsWith(".css"))
      return (
        <IconBrandSass
          className="text-blue-500"
          style={{ width: rem(16), height: rem(16) }}
        />
      );
    if (file.name.endsWith(".py"))
      return (
        <IconBrandPython
          className="text-green-500"
          style={{ width: rem(16), height: rem(16) }}
        />
      );
    if (file.name.endsWith(".java"))
      return (
        <IconCoffee
          className="text-red-500"
          style={{ width: rem(16), height: rem(16) }}
        />
      );
    return (
      <IconFileText
        className="text-gray-500"
        style={{ width: rem(16), height: rem(16) }}
      />
    );
  };

  const getLanguageFromExtension = (filename) => {
    const extension = filename.split(".").pop();
    switch (extension) {
      case "html":
        return "html";
      case "css":
        return "css";
      case "js":
        return "javascript";
      case "go":
        return "go";
      case "py":
        return "python";
      case "java":
        return "java";
      default:
        return "plaintext";
    }
  };

  const handleRunCode = () => {
    const combinedCode = `
      <style>${cssCode || ""}</style>
      ${htmlCode || ""}
      <script>${jsCode || ""}</script>
    `;
    setOutputCode(combinedCode);
  };

  const openSpinner = () => {
    if (projectName.length === 0) {
      alert("Project Name Required");
      return;
    }
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 5000);
  };

  const handleOpenNewWindow = () => {
    const outputWindow = window.open();
    outputWindow.document.write(outputCode);
    outputWindow.document.close();
  };

  return (
    <div
      className={`sticky bg-[#15161a] ${
        isMobile ? "flex-col" : "flex"
      } h-screen`}
    >
      <PanelGroup direction={isMobile ? "vertical" : "horizontal"}>
        {/* File Tree Pane */}
        <Panel
          defaultSize={isMobile ? 30 : 20}
          minSize={isMobile ? 20 : 10}
          maxSize={isMobile ? 40 : 30}
          className={isMobile ? "border-b-2" : "border-r-2 border-gray-600"}
        >
          <FileTree />
        </Panel>

        <PanelResizeHandle className="bg-gray-600" />

        {/* Right Section: Code Editor, Output, and CLI */}
        <Panel defaultSize={isMobile ? 70 : 80} minSize={isMobile ? 60 : 70}>
          <PanelGroup direction="vertical" style={{ height: "100%" }}>
            {/* Code Editor and Output Section */}
            <Panel defaultSize={80} minSize={50}>
              <PanelGroup
                direction={isMobile ? "vertical" : "horizontal"}
                style={{ height: "100%" }}
              >
                <Panel
                  defaultSize={isMobile ? 60 : 70}
                  minSize={isMobile ? 40 : 30}
                >
                  <div className="flex flex-col h-full">
                    <Tabs
                      defaultValue={files[0]?.name || ""}
                      variant="unstyled"
                      classNames={classes}
                    >
                      <div className="flex border-b-2 border-gray-600 p-[1px]">
                        {/* Tabs list with horizontal scrolling */}
                        <Tabs.List className="flex w-full flex-nowrap overflow-x-auto custom-scrollbar">
                          <div className="flex p-1">
                            {files.map((file) => (
                              <Tabs.Tab
                                key={file.name}
                                value={file.name}
                                leftSection={getFileIcon(file)}
                              >
                                {file.name}
                              </Tabs.Tab>
                            ))}
                          </div>
                        </Tabs.List>
                      </div>

                      {files.map((file, index) => (
                        <Tabs.Panel key={file.name} value={file.name}>
                          <PrivateEditor
                            code={file.content}
                            className={"border-2 border-gray-600"}
                            language={getLanguageFromExtension(file.name)}
                            onChange={(newValue) =>
                              handleEditorChange(index, newValue)
                            }
                          />
                        </Tabs.Panel>
                      ))}
                    </Tabs>
                  </div>
                </Panel>

                <PanelResizeHandle />

                <Panel
                  defaultSize={isMobile ? 40 : 35}
                  minSize={isMobile ? 30 : 15}
                >
                  <Output privateEditor={true} />
                </Panel>
              </PanelGroup>
            </Panel>

            <PanelResizeHandle />

            {/* CLI Section */}
            <Panel defaultSize={20} minSize={10}>
              <div className="h-full">
                <CLI />
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default PrivateCodeEditorSection;
