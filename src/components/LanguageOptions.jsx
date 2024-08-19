import React, { useState, useRef, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import { Flex, keys, Select } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconPlayerPlay,
  IconBraces,
} from "@tabler/icons-react";
import Buttons from "./Buttons";
import Output from "./Output";

function LanguageOptions() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [isSaved, setIsSaved] = useState(false);
  const editorRef = useRef(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const executeCode = async () => {
    const url = `/api/${language}`;
    try {
      let response = await fetch(url, {
        method: "POST",
        body: code,
      });
      let data = await response.text();
      data = data.replace(/["']/g, "");

      setResult(data);
    } catch (e) {
      setResult(e.message);
    }
  };

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

  const saveCode = async () => {
    console.log("Saving code");
    setIsSaved(true);
  };

  return (
    <div>
      <div
        className="bg-[rgba(30,30,30,255)]"
        style={{ borderBottom: "0.1px solid #C0C0C0" }}
      >
        <div className="flex justify-between items-center p-1">
          <Select
            placeholder="Pick a language"
            className="mb-2 ml-2 text-white"
            styles={{
              input: {
                backgroundColor: "rgba(30,30,30,255)",
                border: "none",
                color: "#c0cee7",
              },
              dropdown: {
                backgroundColor: "rgba(30,30,30,255)",
                color: "#c0cee7",
              },
              item: {
                backgroundColor: "rgba(30,30,30,255)",
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

      <div className="flex flex-col md:flex-row mx-3">
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
          <h2 className="text-center">Output</h2>
          <Output result={result} />
        </div>
      </div>
    </div>
  );
}

export default LanguageOptions;
