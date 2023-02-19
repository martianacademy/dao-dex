import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  HStack,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaExclamationCircle } from "react-icons/fa";
import { SwitchNetworkButtons } from "../../SwitchNetworkButtons";

export const DrawerSwitchNetwork = ({ onClose }: { onClose: () => void }) => {
  return (
    <VStack w="full">
      <DrawerBody>
        <DrawerHeader
          fontSize="lg"
          fontWeight="semibold"
          textAlign="center"
          color="red"
        >
          You are on unsupported network <Icon as={FaExclamationCircle}></Icon>
        </DrawerHeader>
        <Divider />
        <VStack py={5}>
          <SwitchNetworkButtons />
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
            rightIcon={<ChevronRightIcon />}
          >
            Auto switch to default
          </Button>
        </HStack>
      </DrawerFooter>
    </VStack>
  );
};
