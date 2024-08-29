import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Switch, NumberInput, Button } from "@mantine/core";
import {
  setTheme,
  setFontSize,
  setFontFamily,
  setLineNumbers,
  setMinimap,
  setWordWrap,
  setErrorMarking,
} from "../components/redux/editorSettingsSlice";

const EditorSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.editorSettings);

  return (
    <div className="w-1/2 mx-3 mt-2">
      <div className="flex justify-between w-full p-3">
        <span>Theme</span>
        <Select
          className="w-56"
          value={settings.theme}
          onChange={(value) => dispatch(setTheme(value))}
          data={[
            { value: "vs-dark", label: "Dark" },
            { value: "vs-light", label: "Light" },
            { value: "hc-black", label: "High Contrast" },
          ]}
        />
      </div>
      <div className="flex justify-between w-full p-3">
        <span>Font Size</span>
        <NumberInput
          className="w-56"
          value={settings.fontSize}
          onChange={(value) => dispatch(setFontSize(value))}
          min={10}
          max={24}
        />
      </div>
      <div className="flex justify-between w-full p-3">
        <span>Font Family</span>
        <Select
          className="w-56"
          value={settings.fontFamily}
          onChange={(value) => dispatch(setFontFamily(value))}
          data={[
            { value: "monospace", label: "Monospace" },
            { value: "serif", label: "Serif" },
            { value: "sans-serif", label: "Sans-serif" },
            { value: "cursive", label: "Cursive" },
            { value: "fantasy", label: "Fantasy" },
            { value: "comic-sans", label: "Comic Sans" },
            { value: "times-new-roman", label: "Times New Roman" },
            { value: "arial", label: "Arial" },
            { value: "helvetica", label: "Helvetica" },
            { value: "georgia", label: "Georgia" },
            { value: "verdana", label: "Verdana" },
            { value: "garamond", label: "Garamond" },
            { value: "palatino", label: "Palatino" },
            { value: "courier-new", label: "Courier New" },
          ]}
        />
      </div>
      <div className="flex justify-between w-full p-3">
        <span>Line Numbers</span>
        <Select
          className="w-56"
          value={settings.lineNumbers}
          onChange={(value) => dispatch(setLineNumbers(value))}
          data={[
            { value: "on", label: "On" },
            { value: "off", label: "Off" },
          ]}
        />
      </div>
      <div className="flex justify-between w-full p-3">
        <span>Minimap</span>
        <Switch
          checked={settings.minimap}
          onChange={(event) =>
            dispatch(setMinimap(event.currentTarget.checked))
          }
        />
      </div>
      <div className="flex justify-between w-full p-3">
        <span>Word Wrap</span>
        <Select
          className="w-56"
          value={settings.wordWrap}
          onChange={(value) => dispatch(setWordWrap(value))}
          data={[
            { value: "on", label: "On" },
            { value: "off", label: "Off" },
          ]}
        />
      </div>
      <div className="flex justify-between w-full p-3">
        <span>Error Marking</span>
        <Switch
          checked={settings.errorMarking}
          onChange={(event) =>
            dispatch(setErrorMarking(event.currentTarget.checked))
          }
        />
      </div>

      <Button onClick={() => console.log("Settings saved")} className="mt-5">
        Save Settings
      </Button>
    </div>
  );
};

export default EditorSettings;
