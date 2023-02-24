import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { IconType } from "react-icons";
import { FaPowerOff } from "react-icons/fa";
import {
  DrawerMenuRightAuth,
  DrawerMenuRightUniversalAuth,
} from "../../Drawers";

const MenuContainer = ({
  icon,
  heading,
}: {
  icon: IconType;
  heading: string;
}) => {
  return (
    <HStack
      w="full"
      px={10}
      py={2}
      spacing={5}
      cursor="pointer"
      _hover={{
        bgColor: "pink.100",
      }}
      borderRadius="xl"
    >
      <Icon as={icon} boxSize={5} color="green.300"></Icon>
      <Text fontSize="lg" fontWeight="semibold" opacity={0.7}>
        {heading}
      </Text>
    </HStack>
  );
};

export const MenuButton = () => {
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { account, deactivate } = useEthers();
  return (
    <VStack>
      <IconButton
        aria-label="Nav Menu Icon Button."
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        borderRadius="xl"
        onClick={onToggle}
        colorScheme={"orange"}
        bg={"orange.400"}
        _hover={{ bg: "orange.500" }}
      ></IconButton>
      <Drawer
        isOpen={isOpen}
        onClose={onToggle}
        blockScrollOnMount
        preserveScrollBarGap
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody pt={125}>
            {account && <DrawerMenuRightAuth onClose={onClose} />}
            <DrawerMenuRightUniversalAuth onClose={onClose} />
          </DrawerBody>
          <DrawerFooter>
            <HStack px={5} w="full">
              {account ? (
                <Button
                  w="full"
                  colorScheme="red"
                  borderRadius="xl"
                  rightIcon={<FaPowerOff />}
                  variant="outline"
                  onClick={() => deactivate()}
                >
                  Disconnect Wallet
                </Button>
              ) : (
                <Button
                  w="full"
                  colorScheme="red"
                  borderRadius="xl"
                  rightIcon={<CloseIcon />}
                  variant="outline"
                  onClick={onClose}
                >
                  Close
                </Button>
              )}
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </VStack>
  );
};
