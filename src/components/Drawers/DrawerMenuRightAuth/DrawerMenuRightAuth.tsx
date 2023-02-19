import {
  HStack,
  VStack,
  Icon,
  Text,
  Center,
  Divider,
  Avatar,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { shortenAddress, useEthers } from "@usedapp/core";
import React from "react";
import { IconType } from "react-icons";
import { FaChartBar, FaPiggyBank, FaUsers } from "react-icons/fa";
import { TbArrowsDoubleNeSw } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const MenuContainer = ({
  icon,
  heading,
  onClick,
}: {
  icon: IconType;
  heading: string;
  onClick?: () => void;
}) => {
  return (
    <HStack
      w="full"
      px={10}
      py={2}
      spacing={5}
      cursor="pointer"
      _hover={{
        bgColor: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      borderRadius="xl"
      onClick={onClick}
    >
      <Icon as={icon} boxSize={5} color="green.300"></Icon>
      <Text fontWeight="semibold" opacity={0.7}>
        {heading}
      </Text>
    </HStack>
  );
};

export const DrawerMenuRightAuth = ({ onClose }: { onClose: () => void }) => {
  const { account } = useEthers();
  const navigate = useNavigate();
  return (
    <VStack w="full">
      <HStack w="full" px={2} spacing={5}>
        <Avatar></Avatar>
        <Button w={300} colorScheme="green" borderRadius="xl">
          {account && shortenAddress(account)}
        </Button>
      </HStack>
      <Center p={5} w="full">
        <Divider></Divider>
      </Center>
      <MenuContainer
        heading="Dashboard"
        icon={FaChartBar}
        onClick={() => {
          navigate("user");
          onClose();
        }}
      ></MenuContainer>
      <MenuContainer
        heading="Staking"
        icon={FaPiggyBank}
        onClick={() => {
          navigate("user/staking-dashboard");
          onClose();
        }}
      ></MenuContainer>
      <MenuContainer
        heading="Team"
        icon={FaUsers}
        onClick={() => {
          navigate("user/team-dashboard");
          onClose();
        }}
      ></MenuContainer>
      <MenuContainer
        heading="Transactions"
        icon={TbArrowsDoubleNeSw}
        onClick={() => {
          navigate("user/transactions-dashboard");
          onClose();
        }}
      ></MenuContainer>
      <Center p={5} w="full">
        <Divider></Divider>
      </Center>
    </VStack>
  );
};
