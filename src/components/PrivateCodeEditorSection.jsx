import React, { useState } from "react";
import { Tabs, Button, TextInput, Tooltip } from "@mantine/core";
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

function PrivateCodeEditorSection() {
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
      return <IconBrandGolang className="text-gray-500" />;
    if (file.name.endsWith(".js"))
      return <IconBrandJavascript className="text-yellow-500" />;
    if (file.name.endsWith(".html"))
      return <IconHtml className="text-pink-500" />;
    if (file.name.endsWith(".css"))
      return <IconBrandSass className="text-blue-500" />;
    if (file.name.endsWith(".py"))
      return <IconBrandPython className="text-green-500" />;
    if (file.name.endsWith(".java"))
      return <IconCoffee className="text-red-500" />;
    return <IconFileText className="text-gray-500" />;
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
    <div className="sticky bg-[#15161a]">
      <PanelGroup direction="horizontal" style={{ flex: 1 }}>
        <Panel
          defaultSize={65}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            <Tabs defaultValue={files[0]?.name || ""}>
              <div className="flex">
                {/* Updated style for horizontal scroll and thin scrollbar */}
                <Tabs.List className="flex w-full removeFLex max-w-[100%] overflow-x-auto custom-scrollbar">
                  <div className="flex space-x-2">
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
                    language={getLanguageFromExtension(file.name)}
                    onChange={(newValue) => handleEditorChange(index, newValue)}
                  />
                </Tabs.Panel>
              ))}
            </Tabs>
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel style={{ display: "flex", flexDirection: "column" }}>
          <div>Ouput</div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default PrivateCodeEditorSection;
