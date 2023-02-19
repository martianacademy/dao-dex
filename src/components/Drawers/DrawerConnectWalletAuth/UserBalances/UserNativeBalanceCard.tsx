import { Heading, Text, VStack } from "@chakra-ui/react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import React from "react";
import { useSupportedNetworkInfo } from "../../../../hooks";
import { CardContainer } from "./CardContainer";

export const UserNativeBalanceCard = () => {
  const { account, chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const userBalanceWei = useEtherBalance(account);
  const userBalance = userBalanceWei
    ? Number(formatEther(userBalanceWei))
    : 0.0;
  return (
    <CardContainer logo={currentNetwork?.NetworkLogoURL}>
      <Heading size="md" color="pink.400">
        {userBalance > 0 ? userBalance.toFixed(5) : "0.0"}
      </Heading>
      <Heading size="sm">{currentNetwork?.NetworkSymbol} Balance</Heading>
    </CardContainer>
  );
};
