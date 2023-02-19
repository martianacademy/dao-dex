import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Icon,
  Spacer,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TokenSymbol } from "../../../hooks";

export const DrawerMenuRightUniversalAuth = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <VStack px={5} py={2}>
      <Button
        w="full"
        colorScheme="yellow"
        rightIcon={<ChevronRightIcon />}
        borderRadius="xl"
        onClick={() => {
          navigate("swap");
          onClose();
        }}
      >
        Buy {TokenSymbol}
      </Button>
      <Button
        w="full"
        colorScheme="green"
        rightIcon={<ChevronRightIcon />}
        borderRadius="xl"
        variant="outline"
        onClick={() => {
          navigate("stake");
          onClose();
        }}
      >
        Stake {TokenSymbol}
      </Button>

      <HStack w="full" px={5} opacity={0.75}>
        <Text fontWeight="semibold">
          {colorMode === "dark" ? "Dark" : "Light"} Theme
        </Text>
        <Spacer />
        <Icon
          as={colorMode === "dark" ? FaToggleOn : FaToggleOff}
          boxSize={10}
          cursor="pointer"
          onClick={toggleColorMode}
        ></Icon>
      </HStack>
    </VStack>
  );
};
