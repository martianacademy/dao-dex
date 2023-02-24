import {
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import React from "react";

import { useSupportedNetworkInfo } from "../../../hooks/SupportedNetworkInfo";

export const ModalChangeCoin = ({
  onClickNative,
  onClickUSDT,
  onClose,
}: {
  onClickNative?: () => void;
  onClickUSDT?: () => void;
  onClose?: () => void;
}) => {
  const { chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];

  return (
    <VStack spacing={0}>
      <ModalHeader textAlign="center" fontSize="md">
        Please select your favourite coin
      </ModalHeader>
      <Center w={300}>
        <Divider />
      </Center>
      <ModalBody>
        <HStack spacing={5} p={5}>
          <VStack
            cursor="pointer"
            onClick={() => {
              onClickNative!();
              onClose!();
            }}
          >
            <Image boxSize={10} src={currentNetwork?.Native?.Logo}></Image>
            <Heading size="sm" opacity={0.75}>
              {currentNetwork?.Native?.Symbol}
            </Heading>
          </VStack>
          <VStack
            cursor="pointer"
            onClick={() => {
              onClickUSDT!();
              onClose!();
            }}
          >
            <Image boxSize={10} src={currentNetwork?.USDT?.Logo}></Image>
            <Heading size="sm" opacity={0.75}>
              {currentNetwork?.USDT?.Symbol}
            </Heading>
          </VStack>
        </HStack>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="red" borderRadius="xl" w={200} onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </VStack>
  );
};
