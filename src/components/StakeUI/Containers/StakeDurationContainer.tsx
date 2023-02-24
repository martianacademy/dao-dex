import { FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";
import { InputContainer, StakeDurationRadio } from "../../UI";

export const StakeDurationContainer = () => {
  return (
    <InputContainer>
      <FormControl>
        <FormLabel>Staking duration</FormLabel>
        {/* <StakeDurationRadio /> */}
      </FormControl>
    </InputContainer>
  );
};
