import {
  Heading,
  useColorModeValue,
  VStack,
  Wrap,
  Icon,
  Card,
  CardHeader,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { FaExchangeAlt, FaRobot, FaTable, FaWifi } from "react-icons/fa";
import {
  BsBox,
  BsFileCodeFill,
  BsHeadsetVr,
  BsWallet,
  BsWallet2,
} from "react-icons/bs";
import { IconType } from "react-icons";

const FeatureCard = ({
  icon,
  heading,
}: {
  icon: IconType;
  heading: string;
}) => {
  return (
    <Card p={5} borderRadius="3xl">
      <VStack>
        <Icon as={icon} boxSize={7}></Icon>
        <Heading size="sm">{heading}</Heading>
      </VStack>
    </Card>
  );
};

export const Features = () => {
  return (
    <VStack w="full" spacing={5}>
      <HStack spacing={4}>
        <FeatureCard icon={BsBox} heading="Blockchain"></FeatureCard>
        <FeatureCard icon={BsHeadsetVr} heading="Metaverse"></FeatureCard>
        <FeatureCard icon={FaExchangeAlt} heading="Exchange"></FeatureCard>
      </HStack>
      <HStack spacing={4}>
        <FeatureCard icon={FaWifi} heading="Web3"></FeatureCard>
        <FeatureCard icon={BsFileCodeFill} heading="DeFi"></FeatureCard>
        <FeatureCard icon={BsWallet2} heading="Wallet"></FeatureCard>
        <FeatureCard icon={FaRobot} heading="AI"></FeatureCard>
      </HStack>
    </VStack>
  );
};
