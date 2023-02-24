import { VStack } from "@chakra-ui/react";
import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { utils } from "ethers";
import React from "react";
import { useSupportedNetworkInfo } from "../../../../hooks/SupportedNetworkInfo";
import { BalancesCard } from "../../../UI";

export const UserBalances = () => {
  const { chainId, account } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const userNativeBalanceWei = useEtherBalance(account);
  const userTokenBalanceWei = useTokenBalance(
    currentNetwork?.Token?.ContractAddress,
    account
  );
  const userUSDTBalance = useTokenBalance(
    currentNetwork?.USDT?.ContractAddress,
    account
  );
  return (
    <VStack w="full">
      <BalancesCard
        currencyName={currentNetwork?.Token?.Symbol}
        currencyValue={utils.formatUnits(
          userTokenBalanceWei ?? 0,
          currentNetwork?.Token?.Decimals
        )}
        isLoaded={userTokenBalanceWei ? true : false}
        logo={currentNetwork?.Token?.Logo}
      ></BalancesCard>
      <BalancesCard
        currencyName={currentNetwork?.Native?.Symbol}
        currencyValue={utils.formatUnits(
          userNativeBalanceWei ?? 0,
          currentNetwork?.Native?.Decimals
        )}
        isLoaded={userTokenBalanceWei ? true : false}
        logo={currentNetwork?.Native?.Logo}
      ></BalancesCard>
      <BalancesCard
        currencyName={currentNetwork?.USDT?.Symbol}
        currencyValue={utils.formatUnits(
          userTokenBalanceWei ?? 0,
          currentNetwork?.USDT?.Decimals
        )}
        isLoaded={userTokenBalanceWei ? true : false}
        logo={currentNetwork?.USDT?.Logo}
      ></BalancesCard>
    </VStack>
  );
};
