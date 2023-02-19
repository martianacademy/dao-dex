import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { WalletConnectors } from "../../WalletConnectores";

export const DrawerConnectWalletNoAuth = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  return (
    <VStack w="full">
      <DrawerBody>
        <DrawerHeader fontSize="lg" fontWeight="semibold" textAlign="center">
          Connect your favorite wallet
        </DrawerHeader>
        <Divider></Divider>
        <WalletConnectors />
        <VStack>
          <Text fontSize="sm" opacity={0.75} maxW={300} textAlign="center">
            We support almost all wallets. Still your wallet is missing let us
            know.
          </Text>
        </VStack>
      </DrawerBody>
      <DrawerFooter>
        <HStack>
          <Button colorScheme="red" borderRadius="xl" onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="green"
            borderRadius="xl"
            rightIcon={<ExternalLinkIcon />}
            as="a"
            href="https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet"
            target="_blank"
          >
            What is a crypto wallet?
          </Button>
        </HStack>
      </DrawerFooter>
    </VStack>
  );
};
