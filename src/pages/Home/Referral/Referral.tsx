import { VStack } from "@chakra-ui/react";
import React from "react";
import { ReferEarnWorkersSVG } from "../../../assets";
import {
  HeaderStrip,
  SectionHeader,
  UserReferralLink,
} from "../../../components";
import { Rewards } from "./Rewards";

export const Referral = () => {
  return (
    <VStack
      id="referral-page"
      w="full"
      spacing={10}
      pb={100}
      bgImage={ReferEarnWorkersSVG}
      bgRepeat="no-repeat"
      bgPos="bottom"
      bgSize={["300%", "250%", "200%", "150%", "100%"]}
    >
      <HeaderStrip heading="Earn with us" bgColor="purple"></HeaderStrip>
      <SectionHeader
        header="We are growing our community & helping who are helping us growing."
        text="You can earn various rewards including DaoDex Coins when you refer your friend. Let us all grow together. Who want to associate with us full time most welcome. Earn upto 20% rewards."
      ></SectionHeader>
      <Rewards />
      <UserReferralLink />
    </VStack>
  );
};
