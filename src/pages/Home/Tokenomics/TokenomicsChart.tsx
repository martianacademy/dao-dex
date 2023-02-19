import { Box, Image, VStack } from "@chakra-ui/react";
import React from "react";
import { TokenomicsImage, TokenomicsSVG } from "../../../assets";

export const TokenomicsChart = () => {
  return (
    <VStack h="auto" w={["full", 350, 400, 450, 500]}>
      <Image src={TokenomicsSVG}></Image>
    </VStack>
  );
};
