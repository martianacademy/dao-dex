import { ChevronRightIcon } from "@chakra-ui/icons";
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
  Spacer,
  Icon,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import React from "react";
import {
  FaLocationArrow,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import {
  FiArrowDownLeft,
  FiArrowDownRight,
  FiArrowUpRight,
} from "react-icons/fi";

import {
  TokenSymbol,
  useSupportedNetworkInfo,
} from "../../../hooks/SupportedNetworkInfo";

export const ModalSwapTransaction = ({
  inputCurrencyName,
  inputCurrencyValue,
  outputCurrencyName,
  outputCurrencyValue,
  onClickProceed,
  onLoading,
  onClose,
}: {
  inputCurrencyName: string;
  inputCurrencyValue: number;
  outputCurrencyName: string;
  outputCurrencyValue: number;
  onClickProceed: () => void;
  onLoading: boolean;
  onClose: () => void;
}) => {
  const { chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];

  return (
    <VStack spacing={5}>
      <ModalHeader textAlign="center" fontSize="md">
        You are about to swap {TokenSymbol}
      </ModalHeader>
      <Center w={300}>
        <Divider />
      </Center>
      <Text>Please review the transaction & confirm</Text>

      <HStack
        w="full"
        maxW={300}
        borderWidth="thin"
        py={2}
        px={5}
        borderRadius="3xl"
      >
        <VStack cursor="pointer">
          <Image
            boxSize={8}
            // @ts-ignore
            src={currentNetwork?.[inputCurrencyName]?.Logo}
          ></Image>
          <Heading size="xs" opacity={0.75}>
            {/* @ts-ignore */}
            {currentNetwork?.[inputCurrencyName]?.Symbol}
          </Heading>
        </VStack>
        <Spacer />
        <Icon as={FaLongArrowAltRight} boxSize={10} color="red"></Icon>
        <Spacer />
        <HStack>
          <Heading size="sm">{inputCurrencyValue}</Heading>
          <Icon as={FiArrowUpRight} color="red"></Icon>
        </HStack>
      </HStack>
      <HStack
        w="full"
        maxW={300}
        borderWidth="thin"
        py={2}
        px={5}
        borderRadius="3xl"
      >
        <VStack
          cursor="pointer"
          onClick={() => {
            onClose!();
          }}
        >
          <Image
            boxSize={8}
            // @ts-ignore
            src={currentNetwork?.[outputCurrencyName]?.Logo}
          ></Image>
          <Heading size="xs" opacity={0.75}>
            {/* @ts-ignore */}
            {currentNetwork?.[outputCurrencyName]?.Symbol}
          </Heading>
        </VStack>
        <Spacer />
        <Icon as={FaLongArrowAltLeft} boxSize={10} color="green"></Icon>
        <Spacer />
        <HStack>
          <Heading size="sm">{outputCurrencyValue.toFixed(3)}</Heading>
          <Icon as={FiArrowDownLeft} color="green"></Icon>
        </HStack>
      </HStack>

      <ModalFooter>
        <HStack>
          <Button colorScheme="red" borderRadius="xl" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="green"
            borderRadius="xl"
            w={200}
            rightIcon={<ChevronRightIcon />}
            onClick={onClickProceed}
            isLoading={onLoading}
          >
            Proceed
          </Button>
        </HStack>
      </ModalFooter>
    </VStack>
  );
};
