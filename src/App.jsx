import { AppShell, Burger, Group, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Flex, Text } from "@mantine/core";
import { IconBrandVscode } from "@tabler/icons-react";
import "@mantine/core/styles.css";
// import "./app.css";

import LanguageOptions from "./components/LanguageOptions";
import { NavbarMinimal } from "./components/Navbar";
function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider defaultColorScheme="dark">
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
              <Text ml="xs" size="xl" color="rgb(191 219 254)">
                DevPad
              </Text>
            </Flex>
            <IconBrandVscode
              size={50}
              style={{ marginRight: "10px" }}
              strokeWidth={1}
              color="rgb(191 219 254)"
            />
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar p="md" style={{ width: "120px" }}>
          <NavbarMinimal />
        </AppShell.Navbar>

        <AppShell.Main>
          <LanguageOptions />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
