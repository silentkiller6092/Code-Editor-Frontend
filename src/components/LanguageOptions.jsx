// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import { Code, Select } from "@mantine/core";
import { IconDeviceFloppy, IconPlayerPlay } from "@tabler/icons-react";
import Buttons from "./Buttons";
import Output from "./Output";
import "@fontsource/ibm-plex-sans";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useMediaQuery } from "@mantine/hooks";
function LanguageOptions() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const editorRef = useRef(null);
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const executeCode = async () => {
    const url = `/api/v1/execute/${language}`;

    try {
      let response = await fetch(url, {
        method: "POST",
        body: code,
      });
      let data = await response.json();
      data = data["response"] && data["response"].replace(/["']/g, "");

      setResult(data);
    } catch (e) {
      setResult(e.message);
    }
  };

  const saveCode = () => {};

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.shiftKey && event.key === "Enter" && isFocused) {
        executeCode();
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isFocused]);

  return (
    <div className="flex flex-wrap mx-3 md:py-0">
      {/* Conditional Rendering for Mobile and Desktop Layout */}
      {isMobile ? (
        <div className="w-full flex flex-col text-center">
          <div
            className={`flex flex-col bg-[#15161a] border-2 border-gray-600 mt-4`}
          >
            <Select
              placeholder="Pick a language"
              className="p-[6px] text-white sticky"
              withScrollArea={false}
              styles={{
                dropdown: {
                  maxHeight: 200,
                  overflowY: "auto",
                  backgroundColor: "#15161a",
                  color: "#c0cee7",
                },
                input: {
                  backgroundColor: "#15161a",
                  border: "none",
                  color: "#c0cee7",
                },
                item: {
                  backgroundColor: "#15161a",
                  "&[data-hovered]": {
                    backgroundColor: "rgba(50,50,50,255)",
                  },
                  "&[data-selected]": {
                    backgroundColor: "rgba(70,70,70,255)",
                    color: "white",
                  },
                },
              }}
              data={[
                { value: "javascript", label: "JavaScript" },
                { value: "python", label: "Python" },
                { value: "go", label: "Go" },
                { value: "java", label: "Java" },
                { value: "html", label: "HTML" },
                { value: "css", label: "CSS" },
                { value: "ruby", label: "Ruby" },
                { value: "php", label: "PHP" },
                { value: "typescript", label: "TypeScript" },
                { value: "swift", label: "Swift" },
                { value: "kotlin", label: "Kotlin" },
                { value: "csharp", label: "C#" },
                { value: "rust", label: "Rust" },
                { value: "scala", label: "Scala" },
              ]}
              value={language}
              onChange={setLanguage}
            />
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onShiftEnter={executeCode}
              language={language}
              theme="vs-dark"
              onEditorMount={(focused) => {
                setIsFocused(focused);
                editorRef.current = focused ? editorRef.current : null;
              }}
            />
          </div>

          {/* Output Component for Mobile */}
          <div className="w-full text-gray-300">
            <Output privateEditor={true} />
          </div>
        </div>
      ) : (
        <PanelGroup
          autoSaveId="example"
          direction="horizontal"
          className="flex w-full"
        >
          <Panel
            defaultSize={65}
            className="text-center bg-[#15161a] border-b-2 border-gray-600"
          >
            <Select
              placeholder="Pick a language"
              className="p-[6px] text-white sticky"
              withScrollArea={false}
              styles={{
                dropdown: {
                  maxHeight: 200,
                  overflowY: "auto",
                  backgroundColor: "#15161a",
                  color: "#c0cee7",
                },
                input: {
                  backgroundColor: "#15161a",
                  border: "none",
                  color: "#c0cee7",
                },
                item: {
                  backgroundColor: "#15161a",
                  "&[data-hovered]": {
                    backgroundColor: "rgba(50,50,50,255)",
                  },
                  "&[data-selected]": {
                    backgroundColor: "rgba(70,70,70,255)",
                    color: "white",
                  },
                },
              }}
              data={[
                { value: "javascript", label: "JavaScript" },
                { value: "python", label: "Python" },
                { value: "go", label: "Go" },
                { value: "java", label: "Java" },
                { value: "html", label: "HTML" },
                { value: "css", label: "CSS" },
                { value: "ruby", label: "Ruby" },
                { value: "php", label: "PHP" },
                { value: "typescript", label: "TypeScript" },
                { value: "swift", label: "Swift" },
                { value: "kotlin", label: "Kotlin" },
                { value: "csharp", label: "C#" },
                { value: "rust", label: "Rust" },
                { value: "scala", label: "Scala" },
              ]}
              value={language}
              onChange={setLanguage}
            />
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onShiftEnter={executeCode}
              language={language}
              theme="vs-dark"
              onEditorMount={(focused) => {
                setIsFocused(focused);
                editorRef.current = focused ? editorRef.current : null;
              }}
            />
          </Panel>
          <PanelResizeHandle />
          <Panel defaultSize={35} className="text-gray-300">
            <Output privateEditor={true} />
          </Panel>
        </PanelGroup>
      )}
    </div>
  );
}

export default LanguageOptions;
