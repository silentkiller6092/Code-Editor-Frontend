import { useState, useEffect } from "react";
import { Tooltip, UnstyledButton, Stack, ScrollArea } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
  IconHome2,
  IconCode,
  IconFilePlus,
  IconClipboardCheck,
  IconUser,
  IconSettings,
  IconBook,
  IconLifebuoy,
} from "@tabler/icons-react";
import classes from "../Style/NavbarMinimal.module.css";

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  color,
  glowColor,
  linkClicked,
}) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link to={linkClicked} className={classes.linkWrapper}>
        <UnstyledButton
          onClick={onClick}
          className={classes.link}
          data-active={active || undefined}
        >
          <Icon
            style={{
              width: "20px",
              height: "20px",
              color: color,
              filter: `drop-shadow(0 0 6px ${glowColor})`,
            }}
            stroke={1.5}
          />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const mockdata = [
  {
    icon: IconHome2,
    label: "Home",
    color: "rgb(56 189 248)", // Light Blue
    glowColor: "#00ffff", // Cyan Glow
    linkClicked: "/",
  },
  {
    icon: IconCode,
    label: "Code Editor",
    color: "rgb(244 114 182)", // Pink
    glowColor: "#ff4500", // Orange Glow
    linkClicked: "/code-editor",
  },
  {
    icon: IconFilePlus,
    label: "Workspace",
    color: "rgb(34 197 94)", // Green
    glowColor: "#00ff7f", // Spring Green Glow
    linkClicked: "/workspace",
  },
  {
    icon: IconUser,
    label: "Account",
    color: "rgb(255 159 64)", // Orange
    glowColor: "#ffa500", // Orange Glow
    linkClicked: "/account",
  },
  {
    icon: IconClipboardCheck,
    label: "Task Manager",
    color: "rgb(147 51 234)", // Purple
    glowColor: "#da70d6", // Orchid Glow
    linkClicked: "/task-manager",
  },
  {
    icon: IconSettings,
    label: "Settings",
    color: "rgb(52 211 153)", // Mint Green
    glowColor: "#ff6347", // Tomato Glow
    linkClicked: "/settings",
  },
  {
    icon: IconBook,
    label: "User Guide",
    color: "rgb(240 128 128)", // Light Coral
    glowColor: "#ff4500", // Orange Red Glow
    linkClicked: "/user-guide",
  },
  {
    icon: IconLifebuoy,
    label: "Help & Docs",
    color: "rgb(255 69 0)", // Red-Orange
    glowColor: "#ff4500", // Orange Red Glow
    linkClicked: "/help-docs",
  },
];

export function NavbarMinimal() {
  const location = useLocation();
  const [active, setActive] = useState(null);

  useEffect(() => {
    const currentPath = location.pathname;
    // Debug logs
    console.log("Current path:", currentPath);

    const activeIndex = mockdata.findIndex((link) => {
      // Match the link if the current path starts with the link's path
      const isActive =
        currentPath === link.linkClicked ||
        currentPath.startsWith(link.linkClicked + "/");
      console.log(`Matching ${link.linkClicked}: ${isActive}`);
      return isActive;
    });

    // Debug log for active index
    console.log("Active index:", activeIndex);
    setActive(activeIndex);
  }, [location.pathname]);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <div className="pb-28">
      <nav className={classes.navbar}>
        <ScrollArea
          className="md:h-[29rem] h-[40rem]"
          scrollbarSize={2}
          style={{ width: "88px" }}
        >
          <div className={classes.navbarMain}>
            <Stack justify="center" className="gap-7 md:gap-5 ">
              {links}
            </Stack>
          </div>
        </ScrollArea>
      </nav>
    </div>
  );
}
