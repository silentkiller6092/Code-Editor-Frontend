import React, { useState, useEffect, useRef } from "react";
import { Text, Paper } from "@mantine/core";

function Output({ result }) {
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);

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

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "cursive",
        width: "100%",

        border: focus ? "1px solid #A9A9A9" : "none",
        transition: "border 0.3s ease",
      }}
    >
      <Paper
        onClick={() => setFocus(true)}
        shadow="md"
        style={{ height: "90vh", background: "rgba(30,30,30,255)" }}
      >
        <Text color="white" fontSize="2xl" fontWeight="bold">
          {result}
        </Text>
      </Paper>
    </div>
  );
}

export default Output;
