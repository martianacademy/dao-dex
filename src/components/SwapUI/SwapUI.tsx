import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { StakeDurationRadio } from "../UI";
import {
  NativeContainer,
  ReferrerContainer,
  TokenContainer,
} from "./Containers";

export const SwapUI = () => {
  return (
    <VStack
      w={300}
      borderRadius="50px"
      p={5}
      bgColor={useColorModeValue("whiteAlpha.700", "gray.900")}
    >
      <ReferrerContainer />
      <NativeContainer />
      <TokenContainer />
      <Heading size="sm" borderRadius="xl" w="full" textAlign="center">
        1 MATIC = 1 DaoDex
      </Heading>
      <FormControl>
        <FormLabel textAlign="center">Please select staking duration</FormLabel>
        <StakeDurationRadio />
      </FormControl>
      <Button
        w="full"
        h={20}
        borderRadius="3xl"
        colorScheme="orange"
        bg="orange.400"
        _hover={{
          bg: "orange.500",
        }}
      >
        Swap
      </Button>
    </VStack>
  );
};
