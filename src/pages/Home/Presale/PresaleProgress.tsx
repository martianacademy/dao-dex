import {
  Heading,
  HStack,
  Progress,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export const PresaleProgress = () => {
  const [sliderValue, setSliderValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);
  return (
    <VStack
      w="full"
      maxW={700}
      p={25}
      spacing={10}
      borderRadius={50}
      bgColor={useColorModeValue("white", "gray.800")}
      boxShadow="lg"
      borderWidth="thin"
    >
      <Heading size="md">Presale Progress</Heading>
      <VStack w="full">
        <Progress
          hasStripe
          value={5}
          isAnimated
          w="full"
          borderRadius="full"
          h={5}
          colorScheme="green"
        />
        <HStack
          w="full"
          maxW={700}
          justify="space-evenly"
          textColor="green.400"
          fontWeight="bold"
        >
          <Text>25%</Text>
          <Text>50%</Text>
          <Text>75%</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};
