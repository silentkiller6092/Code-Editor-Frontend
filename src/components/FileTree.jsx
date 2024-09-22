import React from "react";
import {
  GeistProvider,
  CssBaseline,
  Tree,
  useTheme,
  useToasts, // Only import useToasts, not setToast
} from "@geist-ui/core";

const FileTree = () => {
  const theme = useTheme();
  const { setToast } = useToasts(); // setToast is provided by useToasts
  const handler = (path) => setToast({ text: path }); // Use setToast to display a toast
  const files = [
    {
      type: "directory",
      name: "controllers",

      files: [
        {
          type: "file",
          name: "cs.js",
        },
        {
          type: "directory",
          name: "src",

          files: [
            {
              type: "file",
              name: "controllers.md",
            },
            { type: "file", name: "controllers.md" },
          ],
        },
      ],
    },
    {
      type: "directory",
      name: "docs",

      files: [
        {
          type: "file",
          name: "controllers.md",
        },
        {
          type: "file",
          name: "es6.md",
        },
      ],
    },
    {
      type: "file",
      name: "production.md",
    },
    {
      type: "file",
      name: "views.md",
    },
  ];
  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <div style={{ color: theme.palette.foreground }}>
        <Tree onClick={handler} value={files} initialExpand={true}></Tree>
      </div>
    </GeistProvider>
  );
};

export default FileTree;
