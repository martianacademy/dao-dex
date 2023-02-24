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
import { FaLongArrowAltRight } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

import {
  TokenSymbol,
  useSupportedNetworkInfo,
} from "../../../hooks/SupportedNetworkInfo";

export const ModalStakeTransaction = ({
  onClose,
  inputCurrencyName,
  inputCurrencyValue,
  stakingDuration,
  stakingAPY,
  onClickProceed,
  onLoading,
}: {
  inputCurrencyName: string;
  inputCurrencyValue: number;
  stakingDuration: number;
  stakingAPY: number;
  onClose: () => void;
  onClickProceed: () => void;
  onLoading: boolean;
}) => {
  const { chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];

  return (
    <VStack spacing={5} px={5}>
      <ModalHeader textAlign="center" fontSize="md">
        You are about to stake {TokenSymbol}
      </ModalHeader>
      <Center w={300}>
        <Divider />
      </Center>

      <HStack w="full" borderWidth="thin" py={2} px={5} borderRadius="3xl">
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
      <VStack spacing={1} w="full">
        <HStack w="full" px={10}>
          <Text>Staking duration</Text>
          <Spacer />
          <Text>{stakingDuration} Months</Text>
        </HStack>
        <HStack w="full" px={10}>
          <Text>APY</Text>
          <Spacer />
          <Text>{stakingAPY} %</Text>
        </HStack>
      </VStack>

      <ModalFooter>
        <HStack>
          <Button colorScheme="red" borderRadius="xl" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="green"
            borderRadius="xl"
            w={200}
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
