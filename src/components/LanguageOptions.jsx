import React, { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import { Select } from "@mantine/core";
import { IconDeviceFloppy, IconPlayerPlay } from "@tabler/icons-react";
import Buttons from "./Buttons";
import Output from "./Output";
import "@fontsource/ibm-plex-sans";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function LanguageOptions() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [language, setLanguage] = useState("javascript");

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
    <div className=" flex flex-col overflow-hidden">
      <div
        className="bg-[#15161a] mt-0"
        style={{ borderBottom: "0.1px solid #C0C0C0" }}
      >
        <div className="flex justify-between items-center">
          <Select
            placeholder="Pick a language"
            className="mb-1  text-white"
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

          <div className="flex space-x-2">
            <Buttons
              IconName={IconPlayerPlay}
              functionName={executeCode}
              Desc={"Run Code"}
            />
            <Buttons
              IconName={IconDeviceFloppy}
              functionName={saveCode}
              Desc={"Save Code"}
            />
          </div>
        </div>
      </div>

      <PanelGroup direction="horizontal" style={{ flex: 1 }}>
        <Panel
          defaultSize={65}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <CodeEditor
            code={code}
            onChange={handleCodeChange}
            onShiftEnter={executeCode}
            language={language}
            theme={"vs-dark"}
            onEditorMount={(focused) => {
              setIsFocused(focused);
              editorRef.current = focused ? editorRef.current : null;
            }}
          />
        </Panel>
        <PanelResizeHandle />
        <Panel style={{ display: "flex", flexDirection: "column" }}>
          <Output result={result} />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default LanguageOptions;
