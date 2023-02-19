import { useColorModeValue, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { Nav, Footer } from "./components";
import { ScrollToTop } from "./navigation";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <VStack
      w="full"
      bgColor={useColorModeValue("gray.100", "gray.800")}
      overflowY="hidden"
    >
      <ScrollToTop />
      <Nav />
      <Outlet />
      <Footer />
    </VStack>
  );
}
