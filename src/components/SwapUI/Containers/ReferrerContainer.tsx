import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { InputContainer } from "../../UI";

export const ReferrerContainer = () => {
  return (
    <InputContainer>
      <FormControl>
        <FormLabel>Referrer Address</FormLabel>
        <Input
          borderRadius="xl"
          placeholder="Enter your referrer address."
        ></Input>
      </FormControl>
      <HStack>
        <Button colorScheme="red" borderRadius="xl" size="sm">
          Clear
        </Button>
        <Button colorScheme="green" borderRadius="xl" size="sm" w="full">
          Default Referrer
        </Button>
      </HStack>
    </InputContainer>
  );
};
