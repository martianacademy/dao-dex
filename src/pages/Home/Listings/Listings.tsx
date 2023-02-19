import { VStack } from "@chakra-ui/react";
import React from "react";
import { HeaderStrip, SectionHeader } from "../../../components";
import { ExchangeList } from "./ExchangeList";

export const Listings = () => {
  return (
    <VStack w="full" spacing={10}>
      <HeaderStrip heading="Listing Soon..." bgColor="red.400"></HeaderStrip>
      <SectionHeader
        header="Growth of community & profits to investors, neccessity of an organization."
        text="We are keen to grow our community as well as to grow the investments of our community members. As listing on exchange boost the community & demand which result more acceptability & sustainability. We are already talking to exchanges and start listing soon. Here is the list of potential exchanges:"
      ></SectionHeader>
      <ExchangeList />
    </VStack>
  );
};
