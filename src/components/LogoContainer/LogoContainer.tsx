import {
  Badge,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TokenLogo, TokenSymbol } from "../../hooks";

export const LogoContainer = () => {
  const navigate = useNavigate();
  return (
    <HStack onClick={() => navigate("/")} cursor="pointer">
      <Image boxSize="40px" src={TokenLogo}></Image>
      <Center h={30}>
        <Divider orientation="vertical" />
      </Center>
      <Heading
        size="lg"
        fontWeight="black"
        bgGradient="linear(to-r, green.500, pink.500, yellow.500)"
        bgClip="text"
      >
        {TokenSymbol}
      </Heading>
      <Badge borderRadius="xl" size="sm" fontSize="x-small" colorScheme="blue">
        TM
      </Badge>
    </HStack>
  );
};
