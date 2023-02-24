import { useColorModeValue, VStack } from "@chakra-ui/react";
import React, { Children } from "react";

export const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <VStack
      p={5}
      borderRadius="50px"
      bgColor={useColorModeValue("pink", "gray.900")}
      minW={300}
      spacing={5}
    >
      {children}
    </VStack>
  );
};
