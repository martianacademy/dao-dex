import { Center, Divider, Heading } from "@chakra-ui/react";
import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { utils } from "ethers";
import { CardContainer } from "../../../../components/UI";
import { useSupportedNetworkInfo } from "../../../../hooks/SupportedNetworkInfo";
import { BalancesCard } from "../../../../components";

export const Balances = () => {
  const { account, chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const userTokenBalanceWei = useTokenBalance(
    currentNetwork?.Token?.ContractAddress,
    account
  );
  const userNativeBalalanceWei = useEtherBalance(account);
  const userUSDTBalanceWei = useTokenBalance(
    currentNetwork?.USDT?.ContractAddress,
    account
  );
  return (
    <CardContainer>
      <Heading size="md">Balances</Heading>
      <Center w={200}>
        <Divider></Divider>
      </Center>
      <BalancesCard
        currencyName={currentNetwork?.Token?.Symbol}
        currencyValue={Number(
          utils?.formatUnits(
            userTokenBalanceWei ?? 0,
            currentNetwork?.Token?.Decimals
          )
        ).toFixed(3)}
        logo={currentNetwork?.Token?.Logo}
        isLoaded={userTokenBalanceWei ? true : false}
      ></BalancesCard>
      <BalancesCard
        currencyName={currentNetwork?.Native?.Symbol}
        currencyValue={Number(
          utils?.formatUnits(
            userNativeBalalanceWei ?? 0,
            currentNetwork?.Native?.Decimals
          )
        ).toFixed(3)}
        logo={currentNetwork?.Native?.Logo}
        isLoaded={userTokenBalanceWei ? true : false}
      ></BalancesCard>
      <BalancesCard
        currencyName={currentNetwork?.USDT?.Symbol}
        currencyValue={Number(
          utils?.formatUnits(
            userUSDTBalanceWei ?? 0,
            currentNetwork?.USDT?.Decimals
          )
        ).toFixed(3)}
        logo={currentNetwork?.USDT?.Logo}
        isLoaded={userTokenBalanceWei ? true : false}
      ></BalancesCard>
    </CardContainer>
  );
};
