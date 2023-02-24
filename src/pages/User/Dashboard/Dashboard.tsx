import {
  Card,
  CardHeader,
  Heading,
  HStack,
  Tag,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { CardContainer } from "../../../components";
import { Balances } from "./Balances/Balances";
import { Incomes } from "./Incomes/Incomes";
import { Team } from "./Team/Team";

export const Dashboard = () => {
  return (
    <VStack minH="100vh" w="full" p={5}>
      <Tag colorScheme="green" py={2} px={5} borderRadius="xl">
        <Heading size="md">Dashboard</Heading>
      </Tag>
      <VStack w="full" py={10} spacing={10}>
        <Balances />
        <Incomes />
        <Team />
      </VStack>
    </VStack>
  );
};
