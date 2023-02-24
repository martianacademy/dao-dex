import { InfoIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Spacer,
  Text,
  Icon,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { TokenSymbol } from "../../../hooks/SupportedNetworkInfo";
import { StakeDurationRadio, ValueSelectButtons } from "../../UI";
import { InputContainer } from "../../UI";

export const StakeInputContainer = ({
  userBalance,
  value,
  onChangeInput,
  onClickMin,
  onClick50,
  onClick75,
  onClickMax,
}: {
  userBalance: number;
  value: number | undefined;
  onChangeInput: (e: any) => void;
  onClickMin: () => void;
  onClick50: () => void;
  onClick75: () => void;
  onClickMax: () => void;
}) => {
  return (
    <InputContainer>
      <VStack>
        <HStack w="full" spacing={2}>
          <Text fontSize="sm" w={130}>
            {TokenSymbol} Balance:
          </Text>
          <Spacer />
          <Text fontSize="sm" noOfLines={1}>
            {userBalance.toFixed(2)}
          </Text>
          <Tooltip label={userBalance} borderRadius="xl">
            <Icon as={InfoIcon}></Icon>
          </Tooltip>
        </HStack>
        <Input
          placeholder="Please enter the amount to stake"
          borderRadius="xl"
          value={value}
          onChange={onChangeInput}
        ></Input>
      </VStack>
      <ValueSelectButtons
        onClickMin={onClickMin}
        onClick50={onClick50}
        onClick75={onClick75}
        onClickMax={onClickMax}
      />
    </InputContainer>
  );
};
