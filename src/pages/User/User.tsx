import { VStack } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

export const User = () => {
  return (
    <VStack>
      <Outlet />
    </VStack>
  );
};
