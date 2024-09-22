import React, { useState, useEffect, useRef } from "react";
import { Text, Paper, ScrollArea } from "@mantine/core";
import { useSelector } from "react-redux";

function Output({ result, privateEditor = false }) {
  const ref = useRef(null);
  const [focus, setFocus] = useState(false); // Define setFocus state
  const settings = useSelector((state) => state.editorSettings);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Combine the default fontFamily with the settings.fontFamily
  const combinedFontFamily = `${settings.fontFamily}, cursive`;

  return (
    <div>
      {privateEditor ? (
        <div className="">
          <div className="border-b-2 p-3 border-gray-600">
            <span className="">Output</span>
          </div>
          <div>
            <ScrollArea
              className="h-screen border-l-2 border-gray-600"
              scrollbarSize={4}
            >
              <div
                ref={ref}
                style={{
                  fontFamily: combinedFontFamily,
                  width: "100%",
                  borderLeftWidth: 1,
                }}
              >
                <Paper
                  onClick={() => setFocus(true)}
                  shadow="md"
                  style={{ height: "100vh", background: "#15161a" }} // Use valid CSS
                >
                  <Text
                    color="white"
                    fontSize="2xl"
                    fontWeight="bold"
                    fontFamily={"monospace"}
                  >
                    <p className="">{result}</p>
                  </Text>
                </Paper>
              </div>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <ScrollArea
          className="h-screen border-l-2 border-gray-600"
          scrollbarSize={4}
        >
          <div
            ref={ref}
            style={{
              fontFamily: combinedFontFamily,
              width: "100%",
              borderLeftWidth: 1,
            }}
          >
            <Paper
              onClick={() => setFocus(true)}
              shadow="md"
              style={{ height: "100vh", background: "#15161a" }} // Use valid CSS
            >
              <Text
                color="white"
                fontSize="2xl"
                fontWeight="bold"
                fontFamily={"monospace"}
              >
                <p className="">{result}</p>
              </Text>
            </Paper>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

export default Output;
