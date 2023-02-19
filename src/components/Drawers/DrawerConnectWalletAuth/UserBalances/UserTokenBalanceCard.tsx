import { Heading, Text, VStack } from "@chakra-ui/react";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "ethers/lib/utils";
import { TokenSymbol, useSupportedNetworkInfo } from "../../../../hooks";
import { CardContainer } from "./CardContainer";

export const UserTokenBalanceCard = () => {
  const { account, chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const userBalaceWei = useTokenBalance(
    currentNetwork?.Token?.ContractAddress,
    account
  );
  const userBalace = userBalaceWei
    ? Number(formatUnits(userBalaceWei, currentNetwork?.Token.Decimals))
    : 0;
  return (
    <CardContainer logo={currentNetwork?.Token.Logo}>
      <Heading size="md" color="pink.400">
        {userBalace > 0 ? userBalace.toFixed(5) : "0.0"}
      </Heading>
      <Heading size="sm">{TokenSymbol} Balance</Heading>
    </CardContainer>
  );
};
