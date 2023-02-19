import {
  Box,
  Center,
  Circle,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const ProgressBarContainer = ({
  value,
  valueFor,
  bgColor,
}: {
  value: string;
  valueFor: string;
  bgColor: string;
}) => {
  return (
    <HStack w="full">
      <Box
        width="full"
        w={value}
        h={5}
        bgColor={bgColor}
        borderRadius="full"
      ></Box>
      <Text fontSize="lg" px={2} py={1} bgColor={bgColor} borderRadius="full">
        {value}
      </Text>
      <Text fontSize="lg" px={2} py={1} bgColor={bgColor} borderRadius="full">
        {valueFor}
      </Text>
    </HStack>
  );
};

export const TokenomicsText = () => {
  return (
    <VStack
      w="full"
      p={10}
      borderRadius="50px"
      bgColor={useColorModeValue("white", "gray.800")}
      boxShadow="lg"
      borderWidth="thin"
    >
      <ProgressBarContainer
        bgColor="#7BC4A5"
        value="59%"
        valueFor="Public"
      ></ProgressBarContainer>
      <ProgressBarContainer
        bgColor="#DB9494"
        value="5%"
        valueFor="Developers"
      ></ProgressBarContainer>
      <ProgressBarContainer
        bgColor="#D1D976"
        value="8%"
        valueFor="Founders"
      ></ProgressBarContainer>
      <ProgressBarContainer
        bgColor="#00AC97"
        value="5%"
        valueFor="Promotion"
      ></ProgressBarContainer>
      <ProgressBarContainer
        bgColor="#8982DC"
        value="14%"
        valueFor="Staking Rewards"
      ></ProgressBarContainer>
      <ProgressBarContainer
        bgColor="#BB87E3"
        value="4%"
        valueFor="Airdrop"
      ></ProgressBarContainer>
      <ProgressBarContainer
        bgColor="#4A81C1"
        value="5%"
        valueFor="Play to earn"
      ></ProgressBarContainer>
    </VStack>
  );
};
