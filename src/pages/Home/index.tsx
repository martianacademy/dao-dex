import React from "react";
import {
  Center,
  List,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Header } from "./Header";
import { Presale } from "./Presale";
import { Tokenomics } from "./Tokenomics/Tokenomics";
import { Ropadmap } from "./Roadmap";
import { About } from "./About";
import { Referral } from "./Referral";
import { Staking } from "./Staking";
import { Listings } from "./Listings";
import { ContactUs } from "./ContactUs/ContactUs";

export const Home = () => {
  return (
    <VStack w="full" minH="100vh" py={50}>
      <Header />
      <About />
      <Tokenomics />
      <Ropadmap />
      <Presale />
      <Referral />
      <Staking />
      <Listings />
    </VStack>
  );
};
