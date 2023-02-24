import {
  Button,
  Heading,
  Input,
  useClipboard,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import React from "react";
import { userReferralLink } from "../../hooks/SupportedNetworkInfo";

export const UserReferralLink = () => {
  const { account } = useEthers();
  const referralLink = userReferralLink(account);
  const { onCopy, hasCopied, setValue } = useClipboard(referralLink);
  return (
    <VStack
      w={300}
      bgColor={useColorModeValue("white", "whiteAlpha.200")}
      p={5}
      borderRadius="25px"
      spacing={5}
    >
      <Heading size="md" fontWeight="semibold" color="pink.500">
        Your Referral Link
      </Heading>
      <VStack w="full">
        <Input
          borderRadius="xl"
          defaultValue={userReferralLink(account)}
        ></Input>
        <Button
          w="full"
          borderRadius="xl"
          onClick={() => {
            setValue(referralLink);
            onCopy();
          }}
          colorScheme={hasCopied ? "green" : "orange"}
          bg={hasCopied ? "green.400" : "orange.400"}
          _hover={{ bg: hasCopied ? "green.500" : "orange.500" }}
        >
          {hasCopied ? "Referral Link Copied" : "Copy Your Referral Link"}
        </Button>
      </VStack>
    </VStack>
  );
};
