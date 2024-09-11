import { AppShell, Burger, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { Flex, Text } from "@mantine/core";
import { IconBrandVscode } from "@tabler/icons-react";
import "@mantine/core/styles.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LanguageOptions from "./components/LanguageOptions";
import { NavbarMinimal } from "./components/Navbar";
import WorkSpace from "./components/WorkSpace";
import PrivateCodeEditor from "./components/PrivateCodeEditorSection";
import EditorSettings from "./components/EditorSetting";
import { AuthenticationForm } from "./components/Authenticationform";
import UserProfile from "./components/Profile";
import Logout from "./components/Logout";
import Home from "./components/Home";

function App() {
  const [opened, { toggle }] = useDisclosure();

  // Layout component to wrap routes needing AppShell
  const AppShellLayout = () => (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 120,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      styles={{
        main: {
          backgroundColor: "#1c1f25", // Set background color of main content
        },
        header: {
          backgroundColor: "#1c1f25", // Set background color of header
        },
        navbar: {
          backgroundColor: "#1c1f25", // Set background color of navbar
        },
      }}
    >
      <AppShell.Header>
        <Flex justify="space-between" align="center" direction="row">
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

      <AppShell.Navbar px="md" style={{ width: "120px" }}>
        <NavbarMinimal />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet /> {/* This renders the nested routes */}
      </AppShell.Main>
    </AppShell>
  );

  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <Routes>
          {/* Render Home page without AppShell */}
          <Route path="/" element={<Home />} />

          {/* Wrap all other routes in the AppShellLayout */}
          <Route element={<AppShellLayout />}>
            <Route path="/code-editor" element={<LanguageOptions />} />
            <Route path="/workspace" element={<WorkSpace />} />
            <Route path="/settings" element={<EditorSettings />} />
            <Route path="/account" element={<UserProfile />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/workspace/:id/:type"
              element={<PrivateCodeEditor />}
            />
            <Route path="/auth" element={<AuthenticationForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
