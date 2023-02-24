import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { InputContainer } from "../../UI";

export const ReferrerContainer = ({
  InputValue,
  onChangeInputValue,
  onClickClearButton,
  onClickDefaultReferrer,
  isDisabled,
}: {
  InputValue?: string;
  onChangeInputValue: (e: any) => void;
  onClickClearButton: () => void;
  onClickDefaultReferrer: () => void;
  isDisabled: boolean;
}) => {
  return (
    <InputContainer>
      <FormControl>
        <FormLabel>Referrer Address</FormLabel>
        <Input
          borderRadius="xl"
          placeholder="Enter your referrer address."
          value={InputValue}
          onChange={onChangeInputValue}
          fontSize="sm"
          isDisabled={isDisabled}
        ></Input>
      </FormControl>
      <HStack>
        <Button
          colorScheme="red"
          borderRadius="xl"
          size="sm"
          onClick={onClickClearButton}
          isDisabled={isDisabled}
        >
          Clear
        </Button>
        <Button
          colorScheme="green"
          borderRadius="xl"
          size="sm"
          w="full"
          onClick={onClickDefaultReferrer}
          isDisabled={isDisabled}
        >
          Default Referrer
        </Button>
      </HStack>
    </InputContainer>
  );
};
