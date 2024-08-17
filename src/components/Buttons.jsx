import React from "react";
import { Tooltip, Transition } from "@mantine/core";

function Buttons({ IconName, Desc, functionName }) {
  const iconStyle = {
    backgroundColor: "rgba(30,30,30,255)", // Background color for the icon container
    color: "#c0cee7", // Color of the icon itself
  };

  return (
    <Tooltip
      label={Desc}
      withArrow
      style={{
        background: "#333333",
        color: "white",
        textAlign: "center",
        padding: "2px 10px", // Adjust padding to reduce height
        fontSize: "12px",
      }}
      placement="top"
      position="top"
      transition="scale"
      onClick={functionName}
    >
      <div style={{ cursor: "pointer", marginRight: 10 }}>
        <IconName style={iconStyle} />
      </div>
    </Tooltip>
  );
}

export default Buttons;
