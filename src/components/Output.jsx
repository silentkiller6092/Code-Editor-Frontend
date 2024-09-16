import React, { useState, useEffect, useRef } from "react";
import { Text, Paper, ScrollArea } from "@mantine/core";
import { useSelector } from "react-redux";

function Output({ result }) {
  const ref = useRef(null);
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
    <ScrollArea className="h-[82vh]" scrollbarSize={4}>
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
          style={{ height: "82vh", background: "#15161a" }}
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
  );
}

export default Output;
