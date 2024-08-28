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
  setHighContrast,
} from "../components/redux/editorSettingsSlice";

const EditorSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.editorSettings);

  return (
    <div style={{ padding: "20px" }}>
      <Select
        label="Theme"
        value={settings.theme}
        onChange={(value) => dispatch(setTheme(value))}
        data={[
          { value: "vs-dark", label: "Dark" },
          { value: "vs-light", label: "Light" },
        ]}
      />
      <NumberInput
        label="Font Size"
        value={settings.fontSize}
        onChange={(value) => dispatch(setFontSize(value))}
        min={10}
        max={24}
      />
      <Select
        label="Font Family"
        value={settings.fontFamily}
        onChange={(value) => dispatch(setFontFamily(value))}
        data={[
          { value: "monospace", label: "Monospace" },
          { value: "serif", label: "Serif" },
          { value: "sans-serif", label: "Sans-serif" },
        ]}
      />
      <Select
        label="Line Numbers"
        value={settings.lineNumbers}
        onChange={(value) => dispatch(setLineNumbers(value))}
        data={[
          { value: "on", label: "On" },
          { value: "off", label: "Off" },
        ]}
      />
      <Switch
        label="Minimap"
        checked={settings.minimap}
        onChange={(event) => dispatch(setMinimap(event.currentTarget.checked))}
      />
      <Select
        label="Word Wrap"
        value={settings.wordWrap}
        onChange={(value) => dispatch(setWordWrap(value))}
        data={[
          { value: "on", label: "On" },
          { value: "off", label: "Off" },
        ]}
      />
      <Switch
        label="Error Marking"
        checked={settings.errorMarking}
        onChange={(event) =>
          dispatch(setErrorMarking(event.currentTarget.checked))
        }
      />
      <Switch
        label="High Contrast Theme"
        checked={settings.highContrast}
        onChange={(event) =>
          dispatch(setHighContrast(event.currentTarget.checked))
        }
      />
      <Button
        onClick={() => console.log("Settings saved")}
        style={{ marginTop: "20px" }}
      >
        Save Settings
      </Button>
    </div>
  );
};

export default EditorSettings;
