import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@mantine/core";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { IconPlayerPlay, IconArrowRight } from "@tabler/icons-react";
function Output({ result }) {
  const ref = useRef(null);
  const [focus, setFocus] = useState(false); // Define setFocus state
  const settings = useSelector((state) => state.editorSettings);
  const isMobile = useMediaQuery("(max-width: 768px)");
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
    <div className="">
      <div
        className={`border-b-2 p-[6px] border-gray-600 ${
          isMobile ? "border-2 p-3 border-gray-600" : ""
        }`}
      >
        <div className="flex justify-end gap-10">
          <Button variant="light" leftSection={<IconPlayerPlay size={16} />}>
            Run
          </Button>
          <Button variant="light" leftSection={<IconPlayerPlay size={16} />}>
            Run
          </Button>
        </div>
      </div>
      <div
        className={`border-r-2 border-b-2 p-3 border-gray-600 ${
          isMobile ? "border-2 p-3 border-gray-600" : ""
        } h-screen`}
      >
        <ScrollArea h={500}>
          <p className="text-justify px-4 ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Temporibus, nisi qui! Laudantium repellat mollitia aut aspernatur
            animi quae fuga deleniti voluptate! In consectetur, sit dicta,
            tenetur officia et nihil vero ipsum reiciendis nostrum libero
            nesciunt deserunt rerum iste incidunt delectus culpa aliquid hic
            dignissimos asperiores. Non beatae pariatur voluptas voluptatibus!
            Facere nostrum officiis corporis quidem architecto deserunt, modi ea
            dolores error possimus eum laborum cupiditate maiores. Modi adipisci
            nesciunt nobis inventore veniam quos, reiciendis esse maiores!
            Possimus rerum ut omnis error beatae consequuntur dolor numquam
            minus iusto ratione ipsa non incidunt enim quaerat aspernatur nisi,
            officiis maiores porro quibusdam cum.
          </p>
        </ScrollArea>
      </div>
    </div>
  );
}

export default Output;
