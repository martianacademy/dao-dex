import { Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { LogoContainer, StakeUI } from "../../components";

export const Stake = () => {
  return (
    <VStack w="full" minH="100vh" py={50} px={10} spacing={10}>
      <HStack spacing={5}>
        <Heading size="lg">Stake</Heading>
        <LogoContainer />
      </HStack>
      <StakeUI />
    </VStack>
  );
};
