import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ColorModeChangerButton = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Color Mode Changer Button"
      icon={useColorModeValue(<FaSun />, <FaMoon />)}
      onClick={toggleColorMode}
      borderRadius="xl"
      colorScheme={useColorModeValue("green", "gray")}
      variant="outline"
    ></IconButton>
  );
};
