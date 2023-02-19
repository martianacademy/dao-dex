import { Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { LogoContainer, SwapUI } from "../../components";

export const Swap = () => {
  return (
    <VStack w="full" minH="100vh" py={50} px={10} spacing={10}>
      <HStack spacing={5}>
        <Heading size="lg">Swap</Heading>
        <LogoContainer />
      </HStack>
      <SwapUI />
    </VStack>
  );
};
