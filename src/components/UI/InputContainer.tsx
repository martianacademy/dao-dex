import {
  Box,
  Card,
  Container,
  Stack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { Children } from "react";

export const InputContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      p={3}
      w="full"
      borderRadius="3xl"
      bgColor={useColorModeValue("white", "whiteAlpha.200")}
      borderWidth="thin"
    >
      {children}
    </Stack>
  );
};
