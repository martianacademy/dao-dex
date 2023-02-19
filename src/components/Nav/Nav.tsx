import { HStack, Show, Spacer, useColorModeValue } from "@chakra-ui/react";
import { ColorModeChangerButton } from "../ColorModeChangerButton";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { ConnectWalletIconButton } from "../ConnectWalletIconButton";
import { LogoContainer } from "../LogoContainer";
import { MenuButton } from "./MenuButton";
import { NavLinks } from "./NavLinks";

export const Nav = () => {
  return (
    <HStack
      w="full"
      px={2}
      py={5}
      bgColor={useColorModeValue("gray.100", "gray.800")}
      position="sticky"
      top={0}
      zIndex={111111}
      boxShadow="md"
    >
      <Show below="sm">
        <ConnectWalletIconButton />
      </Show>

      <LogoContainer />
      <Spacer />
      <Show above="xl">
        <NavLinks />
      </Show>
      <Show above="sm">
        <ConnectWalletButton />
      </Show>
      <MenuButton />
      <ColorModeChangerButton />
    </HStack>
  );
};
