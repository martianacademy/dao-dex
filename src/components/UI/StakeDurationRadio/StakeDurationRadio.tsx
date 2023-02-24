import { HStack, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const StakeDurationRadio = ({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) => {
  const borderColorChecked = "orange.400";
  return (
    <VStack spacing={1} onClick={onClick}>
      <Radio
        value={value}
        size="lg"
        borderWidth={25}
        _checked={{
          borderColor: borderColorChecked,
        }}
        _after={{
          content: `'${value}'`,
        }}
      ></Radio>
    </VStack>
  );
};
