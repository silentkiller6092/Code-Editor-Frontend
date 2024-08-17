declare module "@monaco-editor/react" {
  import { FC } from "react";

  interface MonacoEditorProps {
    height?: string;
    language?: string;
    value?: string;
    onChange?: (value: string | undefined) => void;
  }

  const MonacoEditor: FC<MonacoEditorProps>;

  export default MonacoEditor;
}
