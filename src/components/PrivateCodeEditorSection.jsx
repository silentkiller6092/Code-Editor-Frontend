import React, { useState } from "react";
import { Tabs, Button } from "@mantine/core";
import {
  IconBrandJavascript,
  IconHtml,
  IconBrandPython,
  IconBrandGolang,
  IconBrandSass,
  IconCoffee,
  IconFileText,
} from "@tabler/icons-react";
import PrivateEditor from "./templates/PrivateEditor";

function PrivateCodeEditorSection() {
  const initialFiles = [
    {
      name: "index.html",
      content:
        "<!DOCTYPE html><html><head><title>Example</title></head><body></body></html>",
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

  // Variables to store each file's code separately
  const [htmlCode, setHtmlCode] = useState(initialFiles[0].content);
  const [cssCode, setCssCode] = useState(initialFiles[1].content);
  const [jsCode, setJsCode] = useState(initialFiles[2].content);
  console.log(htmlCode);
  const handleEditorChange = (index, newValue) => {
    const updatedFiles = [...files];
    updatedFiles[index].content = newValue;
    setFiles(updatedFiles);

    // Update respective code variables
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

    // Open new page with the output code
    const outputWindow = window.open();
    outputWindow.document.write(combinedCode);
    outputWindow.document.close();
  };

  return (
    <div>
      <Tabs defaultValue={files[0]?.name || ""}>
        <Tabs.List>
          {files.map((file) => (
            <Tabs.Tab
              key={file.name}
              value={file.name}
              leftSection={getFileIcon(file)}
            >
              {file.name}
            </Tabs.Tab>
          ))}
          <Tabs.Tab value="output" leftSection={<IconFileText />}>
            <span onClick={handleRunCode}> Output</span>
          </Tabs.Tab>
        </Tabs.List>

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
  );
}

export default PrivateCodeEditorSection;
