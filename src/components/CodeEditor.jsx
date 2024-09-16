import MonacoEditor from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const CodeEditor = ({
  code,
  onChange,
  language,
  onEditorMount,

  onShiftEnter,
}) => {
  const settings = useSelector((state) => state.editorSettings);
  const editorRef = useRef(null);
  const defaultTheme = {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        background: "15161a",
        token: "",
      },
      {
        foreground: "6a9955",
        background: "15161a",
        fontStyle: "italic",
        token: "comment.block",
      },
      {
        foreground: "ce9178",
        token: "string",
      },
      {
        foreground: "569cd6",
        token: "constant.language",
      },
      {
        foreground: "b5cea8",
        token: "constant.numeric",
      },
      {
        foreground: "dcdcaa",
        token: "keyword",
      },
      {
        foreground: "9cdcfe",
        token: "keyword.operator",
      },
      {
        foreground: "d7ba7d",
        token: "keyword.other.directive",
      },
      {
        foreground: "4ec9b0",
        token: "keyword.control",
      },
      {
        foreground: "c586c0",
        token: "entity.name.type.variant",
      },
      {
        foreground: "d4d4d4",
        token: "entity.name.function",
      },
      {
        foreground: "e6c07b",
        token: "variable.parameter",
      },
      {
        foreground: "d19a66",
        token: "entity.name.tag",
      },
      {
        foreground: "ff0000",
        background: "15161a",
        fontStyle: "bold",
        token: "invalid.illegal",
      },
      {
        foreground: "ff6f6f",
        background: "15161a",
        token: "invalid.deprecated",
      },
      {
        foreground: "9cdcfe",
        token: "punctuation",
      },
    ],
    colors: {
      "editor.foreground": "#D0D0FF",
      "editor.background": "#15161a",
      "editor.selectionBackground": "#0a0a0b5f",
      "editor.lineHighlightBackground": "#0a0a0b5f",
      "editorCursor.foreground": "#7070FF",
      "editorWhitespace.foreground": "#BFBFBF",
    },
  };

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
  }, [onShiftEnter]);

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
  const handleBeforeMount = (monaco) => {
    if (settings.themeChanged) {
      if (
        settings.theme.name !== "vs-dark" &&
        settings.theme.name !== "vs-light" &&
        settings.theme.name !== "hc-black"
      ) {
        monaco.editor.defineTheme("default", settings.theme);
      }
    } else {
      monaco.editor.defineTheme("home", defaultTheme);
    }
  };

  const handleMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidFocusEditorText(handleEditorFocus);
    editor.onDidBlurEditorText(handleEditorBlur);
    if (settings.themeChanged) {
      if (
        settings.theme.name === "vs-dark" ||
        settings.theme.name === "vs-light" ||
        settings.theme.name === "hc-black"
      ) {
        monaco.editor.setTheme(settings.theme.name);
      } else {
        // Use the custom defined theme
        monaco.editor.setTheme("default");
      }
    } else {
      monaco.editor.setTheme("home");
    }
  };

  return (
    <div
      style={{
        height: "82vh",

        fontFamily: "cursive",

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
        beforeMount={handleBeforeMount}
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
