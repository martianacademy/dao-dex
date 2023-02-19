import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Icon,
  Image,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { shortenAddress, useEthers } from "@usedapp/core";
import { MetamaskWalletLogoSVG } from "../../assets";
import { useSupportedNetworkInfo } from "../../hooks";
import { DrawerAuthFull } from "../Drawers";

export const ConnectWalletButton = () => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const { account, chainId } = useEthers();
  const currenNetwork = useSupportedNetworkInfo[chainId!];
  const connectButtonText = account
    ? currenNetwork
      ? shortenAddress(account!)
      : "Unsupported"
    : "Connect Wallet";

  const connectButtonColorScheme = account
    ? currenNetwork
      ? "green"
      : "red"
    : "orange";
  const connectButtonBgColor = account
    ? currenNetwork
      ? "green.500"
      : "red.300"
    : "orange.400";

  const connectButtonBgColorHover = account
    ? currenNetwork
      ? "green.600"
      : "red.400"
    : "orange.500";

  const connectButtonRightIcon = account ? (
    currenNetwork ? (
      <Image
        src={currenNetwork?.NetworkLogoURL}
        boxSize={5}
        p="2px"
        bgColor="white"
        borderRadius="md"
      ></Image>
    ) : (
      <Icon as={CloseIcon} boxSize={3} color="white"></Icon>
    )
  ) : (
    <Image
      src={MetamaskWalletLogoSVG}
      boxSize={6}
      p="2px"
      bgColor="white"
      borderRadius="full"
    ></Image>
  );
  return (
    <VStack>
      <Button
        borderRadius="xl"
        colorScheme={connectButtonColorScheme}
        bg={connectButtonBgColor}
        _hover={{
          bg: connectButtonBgColorHover,
        }}
        rightIcon={connectButtonRightIcon}
        onClick={onToggle}
        fontSize="sm"
      >
        {connectButtonText}
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay></DrawerOverlay>
        <DrawerContent borderTopRadius="50px">
          <DrawerCloseButton></DrawerCloseButton>
          <DrawerAuthFull onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </VStack>
  );
};
