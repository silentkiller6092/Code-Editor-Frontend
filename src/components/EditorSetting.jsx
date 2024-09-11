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
  setlineHeight,
  setWordWrap,
  setErrorMarking,
  resetThemeChanged,
} from "../components/redux/editorSettingsSlice";

const EditorSettings = () => {
  const [save, setSave] = useState(false);
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.editorSettings);

  const handleThemeChange = async (value) => {
    dispatch(resetThemeChanged(true));
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
  const optionsFilter = ({ options, search }) => {
    const splittedSearch = search.toLowerCase().trim().split(" ");
    return options.filter((option) => {
      const words = option.label.toLowerCase().trim().split(" ");
      return splittedSearch.every((searchWord) =>
        words.some((word) => word.includes(searchWord))
      );
    });
  };

  return (
    <div className="mt-2 w-[92%] ml-10">
      <div className="flex flex-col justify-start w-full p-5 hover:outline-none hover:bg-[#1c1c1c9e] hover:rounded-md">
        <span>
          <span className="text-gray-400">Editor: </span> Theme
        </span>
        <span className="text-gray-400 text-sm">
          Change the Theme of Editor as per Your need:
        </span>
        <Select
          className="w-56"
          placeholder="Select Theme"
          value={settings.theme.name} // Display selected theme name
          onChange={handleThemeChange} // Fetch theme JSON when changed
          withScrollArea={false}
          data={[
            { value: "vs-dark", label: "Dark" },
            { value: "vs-light", label: "Light" },
            { value: "hc-black", label: "High Contrast" },
            { value: "Active4D", label: "Active4D" },
            { value: "All Hallows Eve", label: "All Hallows Eve" },
            { value: "Amy", label: "Amy" },
            { value: "Birds of Paradise", label: "Birds of Paradise" },
            { value: "Blackboard", label: "Blackboard" },
            { value: "Brilliance Black", label: "Brilliance Black" },
            { value: "Brilliance Dull", label: "Brilliance Dull" },
            { value: "Chrome DevTools", label: "Chrome DevTools" },
            { value: "Clouds", label: "Clouds" },
            { value: "Clouds Midnight", label: "Clouds Midnight" },
            { value: "Cobalt", label: "Cobalt" },
            { value: "Cobalt2", label: "Cobalt2" },
            { value: "Dawn", label: "Dawn" },
            { value: "Dominion Day", label: "Dominion Day" },
            { value: "Dracula", label: "Dracula" },
            { value: "Dreamweaver", label: "Dreamweaver" },
            { value: "Eiffel", label: "Eiffel" },
            { value: "Espresso Libre", label: "Espresso Libre" },
            { value: "GitHub", label: "GitHub" },
            { value: "GitHub Dark", label: "GitHub Dark" },
            { value: "GitHub Light", label: "GitHub Light" },
            { value: "IDLE", label: "IDLE" },
            { value: "iPlastic", label: "iPlastic" },
            { value: "idleFingers", label: "idleFingers" },
            { value: "Katzenmilch", label: "Katzenmilch" },
            { value: "krTheme", label: "krTheme" },
            { value: "Kuroir Theme", label: "Kuroir Theme" },
            { value: "LAZY", label: "LAZY" },
            { value: "MagicWB (Amiga)", label: "MagicWB (Amiga)" },
            { value: "Merbivore", label: "Merbivore" },
            { value: "Merbivore Soft", label: "Merbivore Soft" },
            { value: "Monokai", label: "Monokai" },
            { value: "Monokai Bright", label: "Monokai Bright" },
            { value: "monoindustrial", label: "monoindustrial" },
            { value: "Night Owl", label: "Night Owl" },
            { value: "Nord", label: "Nord" },
            { value: "Oceanic Next", label: "Oceanic Next" },
            { value: "Pastels on Dark", label: "Pastels on Dark" },
            { value: "Slush and Poppies", label: "Slush and Poppies" },
            { value: "Solarized-dark", label: "Solarized-dark" },
            { value: "Solarized-light", label: "Solarized-light" },
            { value: "SpaceCadet", label: "SpaceCadet" },
            { value: "Sunburst", label: "Sunburst" },
            {
              value: "Textmate (Mac Classic)",
              label: "Textmate (Mac Classic)",
            },
            { value: "themelist", label: "themelist" },
            { value: "Tomorrow", label: "Tomorrow" },
            { value: "Tomorrow-Night", label: "Tomorrow-Night" },
            { value: "Tomorrow-Night-Blue", label: "Tomorrow-Night-Blue" },
            { value: "Tomorrow-Night-Bright", label: "Tomorrow-Night-Bright" },
            {
              value: "Tomorrow-Night-Eighties",
              label: "Tomorrow-Night-Eighties",
            },
            { value: "Twilight", label: "Twilight" },
            { value: "Upstream Sunburst", label: "Upstream Sunburst" },
            { value: "Vibrant Ink", label: "Vibrant Ink" },
            { value: "Xcode_default", label: "Xcode_default" },
            { value: "Zenburnesque", label: "Zenburnesque" },
          ]}
          filter={optionsFilter}
          searchable
          styles={{
            dropdown: {
              maxHeight: 230,
              overflowY: "auto",
              background: "#1c1f25",
            },
          }}
          mt="md"
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
          onChange={(value) => dispatch(setlineHeight(value))}
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
