import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, VStack, Wrap } from "@chakra-ui/react";
import React from "react";

export const FeaturesButtonsLinks = () => {
  return (
    <Wrap w="full" align="center" justify="center">
      <Button
        borderRadius="2xl"
        rightIcon={<ChevronDownIcon />}
        colorScheme="green"
        h={12}
      >
        Tokenomics
      </Button>
      <Button
        borderRadius="2xl"
        rightIcon={<ChevronDownIcon />}
        colorScheme="green"
        h={12}
      >
        Roadmap
      </Button>
      <Button
        borderRadius="2xl"
        rightIcon={<ChevronDownIcon />}
        colorScheme="green"
        h={12}
      >
        Presale
      </Button>
    </Wrap>
  );
};
