import { useState } from "react";
import { Tooltip, UnstyledButton, Stack } from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";
import classes from "../Style/NavbarMinimal.module.css";

function NavbarLink({ icon: Icon, label, active, onClick, color, glowColor }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
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
    </Tooltip>
  );
}

const mockdata = [
  {
    icon: IconHome2,
    label: "Home",
    color: "rgb(56 189 248)", // Light Blue
    glowColor: "#00ffff", // Cyan Glow
  },
  {
    icon: IconGauge,
    label: "Dashboard",
    color: "rgb(244 114 182)", // Pink
    glowColor: "#ff4500", // Orange Glow
  },
  {
    icon: IconDeviceDesktopAnalytics,
    label: "Analytics",
    color: "rgb(125 211 252)", // Sky Blue
    glowColor: "#00bfff", // Deep Sky Blue Glow
  },
  {
    icon: IconCalendarStats,
    label: "Releases",
    color: "rgb(94 234 212)", // Teal
    glowColor: "#00ffff", // Cyan Glow
  },
  {
    icon: IconUser,
    label: "Account",
    color: "rgb(244 114 182)", // Pink
    glowColor: "#ff4500", // Orange Glow
  },
  {
    icon: IconFingerprint,
    label: "Security",
    color: "rgb(56 189 248)", // Light Blue
    glowColor: "#00ffff", // Cyan Glow
  },
  {
    icon: IconSettings,
    label: "Settings",
    color: "rgb(52 211 153)", // Mint Green
    glowColor: "#ff6347", // Tomato Glow
  },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}
