import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { Select, Switch, NumberInput } from "@mantine/core";
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
  const [save, setSave] = useState(false);
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.editorSettings);

  const handleThemeChange = async (value) => {
    if (value === "vs-dark" || value === "vs-light" || value === "hc-black") {
      dispatch(setTheme({ name: value, rules: [], colors: {} }));
    } else {
      try {
        const response = await fetch(`/themes/${value}.json`);
        const theme = await response.json();
        dispatch(setTheme(theme));
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    }
  };

  const saveSetting = () => {
    setSave(true);
    setTimeout(() => {
      setSave(false);
    }, 3000);
  };

  return (
    <div className="mt-2 w-[92%] ml-10 bg-black">
      <div className="flex flex-col justify-start w-full p-5 hover:outline-none hover:bg-[#1c1c1c9e] hover:rounded-md">
        <span>
          <span className="text-gray-400">Editor: </span> Theme
        </span>
        <span className="text-gray-400 text-sm">
          Change the Theme of Editor as per Your need:
        </span>
        <Select
          className="w-56"
          value={settings.theme.name} // Display selected theme name
          onChange={handleThemeChange} // Fetch theme JSON when changed
          data={[
            { value: "vs-dark", label: "Dark" },
            { value: "vs-light", label: "Light" },
            { value: "hc-black", label: "High Contrast" },
            { value: "Dawn", label: "Dawn" },
            { value: "Amy", label: "Amy" },
          ]}
        />
      </div>
      <div className="flex flex-col justify-start w-full p-5 hover:outline-none hover:bg-[#1c1c1c9e] hover:rounded-md">
        <span>
          {" "}
          <span className="text-gray-400">Editor: </span> Font Size
        </span>
        <span className="text-gray-400 text-sm">
          Font Size Controls the font size in pixels.
        </span>
        <NumberInput
          className="w-56"
          value={settings.fontSize}
          onChange={(value) => dispatch(setFontSize(value))}
          min={10}
          max={24}
        />
      </div>

      <div className="flex flex-col justify-start w-full p-5 hover:outline-none hover:bg-[#1c1c1c9e] hover:rounded-md">
        <span>
          {" "}
          <span className="text-gray-400">Editor: </span> Line Height
        </span>
        <span className="text-gray-400 text-sm">
          Line height Controls the font size in pixels.
        </span>
        <NumberInput
          className="w-56"
          value={settings.lineHeight}
          onChange={(value) => dispatch(setFontSize(value))}
        />
      </div>
      <div className="flex flex-col justify-start w-full p-5 hover:outline-none hover:bg-[#1c1c1c9e] hover:rounded-md">
        <span>
          {" "}
          <span className="text-gray-400">Editor: </span> Font Style
        </span>
        <span className="text-gray-400 text-sm">
          Change your font style as per your need.
        </span>
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
      <div className="flex flex-col justify-start w-full p-5 hover:outline-none hover:bg-[#1c1c1c9e] hover:rounded-md">
        <span>
          {" "}
          <span className="text-gray-400">Editor: </span> Line Numbers
        </span>
        <span className="text-gray-400 text-sm">Change the Line Number</span>
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
      <div className="flex flex-col justify-start w-full p-5 hover:outline-none hover:bg-[#1c1c1c9e] hover:rounded-md">
        <span>
          {" "}
          <span className="text-gray-400">Editor: </span> MinMap
        </span>
        <span className="text-gray-400 text-sm">
          Font Size Controls the font size in pixels.
        </span>
        <Switch
          checked={settings.minimap}
          onChange={(event) =>
            dispatch(setMinimap(event.currentTarget.checked))
          }
        />
      </div>
      <div className="flex flex-col justify-start w-full p-5 hover:outline-none hover:bg-[#1c1c1c9e] hover:rounded-md">
        <span>
          {" "}
          <span className="text-gray-400">Editor: </span> Word Wrap
        </span>
        <span className="text-gray-400 text-sm">
          Font Size Controls the font size in pixels.
        </span>
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
      <div className="flex flex-col justify-start w-full p-5 hover:outline-none hover:bg-[#1c1c1c9e] hover:rounded-md">
        <span>
          {" "}
          <span className="text-gray-400">Editor: </span> Error Marking
        </span>
        <span className="text-gray-400 text-sm">
          Font Size Controls the font size in pixels.
        </span>
        <Switch
          checked={settings.errorMarking}
          onChange={(event) =>
            dispatch(setErrorMarking(event.currentTarget.checked))
          }
        />
      </div>

      <div className="w-full mt-4 flex justify-center">
        <button
          type="button"
          class="py-2.5 px-2 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 z-20"
        >
          <span className="text-xl flex items-center mx-1 px-1">
            {" "}
            <IconDeviceFloppy />
            Sign up for Free
          </span>
        </button>
      </div>
    </div>
  );
};

export default EditorSettings;
