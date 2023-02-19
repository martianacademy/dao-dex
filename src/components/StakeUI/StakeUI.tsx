import { Button, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";
import { StakeContainer } from "./Containers/StakeContainer";

export const StakeUI = () => {
  return (
    <VStack
      w={300}
      borderRadius="50px"
      p={5}
      bgColor={useColorModeValue("whiteAlpha.700", "gray.900")}
    >
      <StakeContainer />
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
        Stake
      </Button>
    </VStack>
  );
};
