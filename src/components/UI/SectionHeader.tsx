import {
  Card,
  CardHeader,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export const SectionHeader = ({
  header,
  text,
}: {
  header: string;
  text: string;
}) => {
  return (
    <VStack spacing={5} maxW="7xl" opacity={0.75} p={5}>
      <Card maxW="2xl" borderRadius="50px">
        <CardHeader>
          <Heading textAlign="center">{header}</Heading>
        </CardHeader>
      </Card>
      <Text textAlign="center" fontSize={["xl", "xl", "2xl"]} maxW="3xl">
        {text}
      </Text>
    </VStack>
  );
};
