import MonacoEditor from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
const CodeEditor = ({
  code,
  onChange,
  language,
  theme,
  onEditorMount,
  isFocused,
  onShiftEnter,
}) => {
  const settings = useSelector((state) => state.editorSettings);
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
        display: "flex", // Add Flexbox
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
      className="code-editor"
    >
      <MonacoEditor
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme={settings.theme}
        options={{
          automaticLayout: true,
          lineNumbers: settings.lineNumbers,
          minimap: {
            enabled: settings.minimap,
            size: "fit",
          },
          scrollBeyondLastLine: false,
          fontSize: settings.fontSize,
          fontFamily: settings.fontFamily,
          wordWrap: settings.wordWrap,
          tabSize: 2,
          lineHeight: settings.lineHeight,

          renderLineHighlight: settings.errorMarking ? "all" : "none",
          renderWhitespace: "all",
          colorDecorators: true,
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
