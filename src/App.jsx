import { AppShell, Burger, Group, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { Flex, Text } from "@mantine/core";
import { IconBrandVscode } from "@tabler/icons-react";
import "@mantine/core/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LanguageOptions from "./components/LanguageOptions";
import { NavbarMinimal } from "./components/Navbar";
import GlobeDemo from "./components/Home";

import WorkSpace from "./components/WorkSpace";
import PrivateCodeEditor from "./components/PrivateCodeEditorSection";
import EditorSettings from "./components/EditorSetting";

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 120,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
        >
          <AppShell.Header>
            <Flex justify="space-between" align="center" direction="row" mt={3}>
              <Flex align="center">
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                  color="rgb(191 219 254)"
                />

                <Text size="xl" ml={14} color="rgb(191 219 254)">
                  CodeSphere
                </Text>
              </Flex>
              <Flex align="center">
                <IconBrandVscode
                  size={50}
                  style={{ marginRight: "10px" }}
                  strokeWidth={1}
                  color="rgb(191 219 254)"
                />
              </Flex>
            </Flex>
          </AppShell.Header>

          <AppShell.Navbar
            px="md"
            className="pt-3 md:pt-0 "
            style={{ width: "120px" }}
          >
            <NavbarMinimal />
          </AppShell.Navbar>

          <AppShell.Main>
            <Routes>
              <Route path="/" element={<GlobeDemo />} />
              <Route path="/code-editor" element={<LanguageOptions />} />
              <Route path="/workspace" element={<WorkSpace />} />
              <Route path="/settings" element={<EditorSettings />} />
              <Route
                path="/workspace/:id/:type"
                element={<PrivateCodeEditor />}
              />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
