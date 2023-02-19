import { Heading, HStack, Progress, Text, VStack } from "@chakra-ui/react";
import { Counter } from "../../../components";

export const PresaleTiming = () => {
  return (
    <VStack w="full" p={25} spacing={10}>
      <Heading size="md">ICO Presale Ends In</Heading>
      <Counter timeinseconds={1685448000} />
    </VStack>
  );
};
