import { Avatar, Box, HStack, Image, VStack } from "@chakra-ui/react";
import React from "react";

export const CardContainer = ({
  children,
  logo,
}: {
  children: React.ReactNode;
  logo?: string;
}) => {
  return (
    <HStack spacing={5}>
      <Image src={logo} boxSize={10}></Image>
      <Box borderRadius="50px">{children}</Box>
    </HStack>
  );
};
