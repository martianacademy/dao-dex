import { useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";
import { EarnRewardWorkersSVG } from "../../../assets";
import { HeaderStrip, SectionHeader } from "../../../components";
import { StakingRewards } from "./StakingRewards";

export const Staking = () => {
  return (
    <VStack
      id="staking-page"
      w="full"
      spacing={10}
      pb={200}
      bgImage={EarnRewardWorkersSVG}
      bgRepeat="no-repeat"
      bgPos="bottom"
      bgSize={["300%", "250%", "200%", "150%", "100%"]}
    >
      <HeaderStrip
        heading="Get staking rewards for holding"
        bgColor="yellow.500"
      ></HeaderStrip>
      <SectionHeader
        header="Staking is the beauty of DeFi. Stake your DaoDex Coins and get returns in USDT."
        text="DaoDex protocol has offered many staking plans. As staking is in trending today's decentralised eco-system which help in growing. We give staking rewards in USDT, so that you can make it in cash anytime. Please go through our staking programs here:"
      ></SectionHeader>
      <StakingRewards />
    </VStack>
  );
};
