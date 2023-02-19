import { FormControl, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import React from "react";
import { StakeDurationRadio } from "../../UI";
import { InputContainer } from "../../UI";

export const StakeContainer = () => {
  return (
    <InputContainer>
      <FormControl>
        <FormLabel>Amount to stake</FormLabel>
        <Input placeholder="Please enter the amount to stake"></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Staking duration</FormLabel>
        <StakeDurationRadio />
      </FormControl>
    </InputContainer>
  );
};
