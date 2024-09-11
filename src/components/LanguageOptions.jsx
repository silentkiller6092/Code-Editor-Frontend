import React, { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import { Select } from "@mantine/core";
import { IconDeviceFloppy, IconPlayerPlay } from "@tabler/icons-react";
import Buttons from "./Buttons";
import Output from "./Output";
import "@fontsource/ibm-plex-sans";

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
      data = data && data["response"].replace(/["']/g, "");

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
    <div>
      <div
        className="bg-[#1c1f25] mt-0"
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
                backgroundColor: "#1c1f25",
                color: "#c0cee7",
              },
              input: {
                backgroundColor: "#1c1f25",
                border: "none",
                color: "#c0cee7",
              },
              item: {
                backgroundColor: "#1c1f25",
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

      <div className="flex flex-col md:flex-row ">
        <div className="md:w-3/5 w-full ">
          <CodeEditor
            code={code}
            onChange={handleCodeChange}
            isFocused={isFocused}
            onShiftEnter={executeCode}
            language={language}
            theme={"vs-dark"}
            onEditorMount={(focused) => {
              setIsFocused(focused);
              editorRef.current = focused ? editorRef.current : null;
            }}
          />
        </div>

        <div className="md:w-2/5 w-full border-t-2 md:border-none">
          <h2 className="md:hidden text-center homeTitle">Output</h2>
          <Output result={result} />
        </div>
      </div>
    </div>
  );
}

export default LanguageOptions;
