import MonacoEditor from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";

const CodeEditor = ({
  code,
  onChange,
  language,
  theme,
  onEditorMount,
  isFocused,
  onShiftEnter,
}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.shiftKey && event.key === "Enter" && isFocused) {
        event.preventDefault();
        onShiftEnter();
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isFocused, onShiftEnter]);

  // Handle editor changes
  const handleEditorChange = (value) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  const handleEditorFocus = () => {
    if (onEditorMount) {
      onEditorMount(true);
    }
  };

  const handleEditorBlur = () => {
    if (onEditorMount) {
      onEditorMount(false);
    }
  };

  return (
    <div
      style={{
        height: "90vh",
        fontFamily: "cursive",
        border: isFocused ? "1px solid #A9A9A9" : "none",
        transition: "border 0.3s ease",
      }}
      className="code-editor"
    >
      <MonacoEditor
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme={theme}
        options={{
          automaticLayout: true,
          lineNumbers: "on",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          readOnly: false,
          fontSize: 14,
          lineHeight: 22,
          wordWrap: "on",
          tabSize: 2,
          insertSpaces: true,
        }}
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          editor.onDidFocusEditorText(handleEditorFocus);
          editor.onDidBlurEditorText(handleEditorBlur);
        }}
      />
    </div>
  );
};

export default CodeEditor;
