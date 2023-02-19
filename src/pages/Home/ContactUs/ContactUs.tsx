import { VStack } from "@chakra-ui/react";
import React from "react";
import { HeaderStrip } from "../../../components";
import { ContactForm } from "./ContactForm";

export const ContactUs = () => {
  return (
    <VStack w="full">
      <HeaderStrip heading="Have querry? Ask us." bgColor="gray"></HeaderStrip>
      <ContactForm />
    </VStack>
  );
};
