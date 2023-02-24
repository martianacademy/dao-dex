import {
  HStack,
  VStack,
  Icon,
  Heading,
  Text,
  useColorModeValue,
  Card,
} from "@chakra-ui/react";
import { FaPiggyBank } from "react-icons/fa";
import { GoFlame } from "react-icons/go";

export const Rewards = () => {
  return (
    <HStack p={5} spacing={5}>
      <Card
        p={5}
        borderRadius="50px"
        w={170}
        h={300}
        align="center"
        justify="center"
      >
        <VStack>
          <Icon as={GoFlame} boxSize={14} color="pink.300"></Icon>
          <Heading size="md" textAlign="center">
            Upto 15% Rewards
          </Heading>
          <Text textAlign="center">
            Native & Stable Coins when your friend buy DaoDex.
          </Text>
        </VStack>
      </Card>
      <Card
        p={5}
        borderRadius="50px"
        w={170}
        h={300}
        align="center"
        justify="center"
      >
        <VStack>
          <Icon as={FaPiggyBank} boxSize={14} color="green.300"></Icon>
          <Heading size="md" textAlign="center">
            Upto 11% Rewards
          </Heading>
          <Text textAlign="center">
            From user friend when he claim staking rewards.
          </Text>
        </VStack>
      </Card>
    </HStack>
  );
};
