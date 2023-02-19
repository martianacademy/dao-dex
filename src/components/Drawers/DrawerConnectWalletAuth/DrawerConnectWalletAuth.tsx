import {
  Button,
  Divider,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  HStack,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import React from "react";
import { FaPowerOff } from "react-icons/fa";
import { NetworkInfoCard } from "./NetworkInfoCard";
import { StakingCard } from "./StakingCard";
import {
  UserNativeBalanceCard,
  UserTokenBalanceCard,
  UserUSDTBalanceCard,
} from "./UserBalances";

export const DrawerConnectWalletAuth = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const { deactivate } = useEthers();
  return (
    <VStack w="full">
      <DrawerBody>
        <DrawerHeader fontSize="lg" fontWeight="semibold" textAlign="center">
          Your wallet
        </DrawerHeader>
        <Divider></Divider>
        <VStack w="full" p={5} spacing={5}>
          <NetworkInfoCard />
          <Wrap
            p={5}
            align="center"
            justify="center"
            borderBottomWidth={5}
            borderBottomRadius="50px"
            spacing={5}
          >
            <HStack w={190}>
              <UserTokenBalanceCard />
            </HStack>
            <HStack w={190}>
              <UserNativeBalanceCard />
            </HStack>
            <HStack w={190}>
              <UserUSDTBalanceCard />
            </HStack>
          </Wrap>
          <StakingCard />
        </VStack>
      </DrawerBody>
      <DrawerFooter>
        <HStack>
          <Button colorScheme="red" borderRadius="xl" onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="red"
            borderRadius="xl"
            variant="outline"
            rightIcon={<FaPowerOff />}
            onClick={() => deactivate()}
          >
            Disconnect Wallet
          </Button>
        </HStack>
      </DrawerFooter>
    </VStack>
  );
};
