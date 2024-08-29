import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import MonacoEditor from "@monaco-editor/react";

const PrivateEditor = ({ code, onChange, language }) => {
  const settings = useSelector((state) => state.editorSettings);
  const editorRef = useRef(null);

  // Ensure the editor container has a proper height
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout(); // Trigger a layout update
    }
  }, [settings]);

  return (
    <div style={{ height: "90vh", width: "100%", position: "relative" }}>
      <MonacoEditor
        theme={settings.theme}
        language={language}
        value={code}
        onChange={(value) => onChange(value || "")}
        options={{
          automaticLayout: true, // Let Monaco handle resizing automatically
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
          insertSpaces: true,
          folding: true,
          renderLineHighlight: settings.errorMarking ? "all" : "none",
          renderWhitespace: "all",
          colorDecorators: true,
        }}
        onMount={(editor) => {
          editorRef.current = editor;
          editor.getAction("editor.action.formatDocument").run();
        }}
      />
    </div>
  );
};

export default PrivateEditor;
