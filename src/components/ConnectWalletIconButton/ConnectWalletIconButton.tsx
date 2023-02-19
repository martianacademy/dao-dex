import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Image,
  useDisclosure,
  VStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import React from "react";
import { MetamaskWalletLogoSVG } from "../../assets";
import { useSupportedNetworkInfo } from "../../hooks";
import { DrawerAuthFull } from "../Drawers";

export const ConnectWalletIconButton = () => {
  const { account, chainId } = useEthers();
  const currenNetwork = useSupportedNetworkInfo[chainId!];
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const avatarIcon = account ? (
    currenNetwork ? (
      <Image
        src={currenNetwork?.NetworkLogoURL}
        boxSize={14}
        p="2px"
        borderRadius="md"
      ></Image>
    ) : (
      <Icon as={CloseIcon} boxSize={5} color="red"></Icon>
    )
  ) : (
    <Image src={MetamaskWalletLogoSVG} boxSize={10}></Image>
  );

  const avatarBadgeColor = account ? (currenNetwork ? "green" : "red") : "red";

  return (
    <VStack>
      <Button
        rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        variant="ghost"
        p={1}
        onClick={onToggle}
      >
        <Avatar size="sm" icon={avatarIcon} bgColor="transparent">
          <AvatarBadge boxSize={4} bgColor={avatarBadgeColor}></AvatarBadge>
        </Avatar>
      </Button>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent borderTopRadius="50px">
          <DrawerCloseButton />
          <DrawerAuthFull onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </VStack>
  );
};
