import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Switch, NumberInput, Button } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
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
  const saveSetting = () => {
    setSave(true);

    setTimeout(() => {
      setSave(false);
    }, 3000);
  };
  return (
    <div className="mt-2 w-[92%] ml-10">
      <div className="flex flex-col justify-start w-full p-5 hover:outline-none hover:bg-[#1c1c1c9e] hover:rounded-md">
        <span>
          {" "}
          <span className="text-gray-400">Editor: </span> Theme
        </span>
        <span className="text-gray-400 text-sm">
          Change the Theme of Editor as per Your need :
        </span>
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

      <div className="w-full flex justify-center">
        <button
          onClick={saveSetting}
          type="button"
          class="py-2.5 cursor-pointer px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        >
          {save ? (
            <span>
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading..
            </span>
          ) : (
            <span className="flex  px-4">
              <IconDeviceFloppy size={20} style={{ marginRight: "6px" }} />
              Save
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditorSettings;
