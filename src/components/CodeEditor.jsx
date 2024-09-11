import MonacoEditor from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const CodeEditor = ({
  code,
  onChange,
  language,
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

  // Move theme definition outside of onMount using beforeMount
  const handleBeforeMount = (monaco) => {
    if (
      settings.theme.name !== "vs-dark" &&
      settings.theme.name !== "vs-light" &&
      settings.theme.name !== "hc-black"
    ) {
      monaco.editor.defineTheme("default", settings.theme);
    }
  };

  const handleMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidFocusEditorText(handleEditorFocus);
    editor.onDidBlurEditorText(handleEditorBlur);

    if (
      settings.theme.name === "vs-dark" ||
      settings.theme.name === "vs-light" ||
      settings.theme.name === "hc-black"
    ) {
      // Directly set Monaco's built-in theme
      monaco.editor.setTheme(settings.theme.name);
    } else {
      // Use the custom defined theme
      monaco.editor.setTheme("default");
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
        beforeMount={handleBeforeMount} // Define the theme before the editor mounts
        onChange={handleEditorChange}
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
        theme={
          settings.theme.name === "vs-dark" ||
          settings.theme.name === "vs-light" ||
          settings.theme.name === "hc-black"
            ? settings.theme.name
            : undefined
        } // Directly set the theme if it's built-in
        onMount={handleMount}
      />
    </div>
  );
};

export default CodeEditor;
