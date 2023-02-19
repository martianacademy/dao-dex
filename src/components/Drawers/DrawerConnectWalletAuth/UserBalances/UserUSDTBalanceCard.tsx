import { Heading, Text, VStack } from "@chakra-ui/react";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "ethers/lib/utils";
import { TokenSymbol, useSupportedNetworkInfo } from "../../../../hooks";
import { CardContainer } from "./CardContainer";

export const UserUSDTBalanceCard = () => {
  const { account, chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const userBalaceWei = useTokenBalance(
    currentNetwork?.USDT?.ContractAddress,
    account
  );
  const userBalace = userBalaceWei
    ? Number(formatUnits(userBalaceWei, currentNetwork?.USDT.Decimals))
    : 0;
  return (
    <CardContainer logo={currentNetwork?.USDT?.Logo}>
      <Heading size="md" color="pink.400">
        {userBalace > 0 ? userBalace.toFixed(5) : "0.0"}
      </Heading>
      <Heading size="sm">{currentNetwork?.USDT?.Symbol} Balance</Heading>
    </CardContainer>
  );
};
