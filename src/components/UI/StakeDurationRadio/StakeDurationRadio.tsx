import { HStack, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const StakeDurationRadio = () => {
  const borderColorChecked = "orange.400";
  return (
    <VStack>
      <RadioGroup defaultValue="90">
        <HStack w="full" justify="space-between">
          <VStack spacing={1}>
            <Radio
              value="90"
              size="lg"
              borderWidth={25}
              _checked={{
                borderColor: borderColorChecked,
              }}
              _after={{
                content: '"3"',
              }}
            ></Radio>
            <VStack spacing={0}>
              <Text fontSize="x-small">Months</Text>
              <HStack spacing={1}>
                <Text fontSize="x-small" color="yellow.500">
                  36%
                </Text>
                <Text fontSize="xx-small">APY</Text>
              </HStack>
            </VStack>
          </VStack>
          <VStack spacing={1}>
            <Radio
              value="180"
              size="lg"
              borderWidth={25}
              _checked={{
                borderColor: borderColorChecked,
              }}
              _after={{
                content: '"6"',
              }}
            ></Radio>

            <VStack spacing={0}>
              <Text fontSize="x-small">Months</Text>
              <HStack spacing={1}>
                <Text fontSize="x-small" color="yellow.500">
                  90%
                </Text>
                <Text fontSize="xx-small">APY</Text>
              </HStack>
            </VStack>
          </VStack>
          <VStack spacing={1}>
            <Radio
              value="365"
              size="lg"
              borderWidth={25}
              _checked={{
                borderColor: borderColorChecked,
              }}
              _after={{
                content: '"12"',
              }}
            ></Radio>
            <VStack spacing={0}>
              <Text fontSize="x-small">Months</Text>
              <HStack spacing={1}>
                <Text fontSize="x-small" color="yellow.500">
                  216%
                </Text>
                <Text fontSize="xx-small">APY</Text>
              </HStack>
            </VStack>
          </VStack>
          <VStack spacing={1}>
            <Radio
              value="545"
              size="lg"
              borderWidth={25}
              _checked={{
                borderColor: borderColorChecked,
              }}
              _after={{
                content: '"18"',
              }}
            ></Radio>
            <VStack spacing={0}>
              <Text fontSize="x-small">Months</Text>
              <HStack spacing={1}>
                <Text fontSize="x-small" color="yellow.500">
                  378%
                </Text>
                <Text fontSize="xx-small">APY</Text>
              </HStack>
            </VStack>
          </VStack>
        </HStack>
      </RadioGroup>
    </VStack>
  );
};
