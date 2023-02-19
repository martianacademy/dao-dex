import { Heading, VStack } from "@chakra-ui/react";
import React from "react";

export const HeaderStrip = ({
  heading,
  bgColor,
}: {
  heading: string;
  bgColor: string;
}) => {
  return (
    <VStack w="full" p={10} bgColor={bgColor}>
      <Heading color="white" size="lg" textAlign="center">
        {heading}
      </Heading>
    </VStack>
  );
};
