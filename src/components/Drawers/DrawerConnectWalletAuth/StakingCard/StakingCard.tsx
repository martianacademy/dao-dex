import { Heading, HStack, Image, Spacer, VStack } from "@chakra-ui/react";
import React from "react";
import { TokenLogo, TokenSymbol } from "../../../../hooks";

export const StakingCard = () => {
  return (
    <VStack spacing={0}>
      <Heading color="green.400">0.0</Heading>
      <HStack>
        <Heading size="sm" textAlign="center">
          {TokenSymbol} Staking Balance
        </Heading>
        <Spacer />
      </HStack>
    </VStack>
  );
};
