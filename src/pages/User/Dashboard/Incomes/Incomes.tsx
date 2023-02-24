import { Center, Divider, Heading } from "@chakra-ui/react";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { tokenLogo } from "../../../../assets";
import { BalancesCard, CardContainer } from "../../../../components";
import { useTotalReferralIncome } from "../../../../hooks/ReferralHooks";
import {
  TokenSymbol,
  useSupportedNetworkInfo,
} from "../../../../hooks/SupportedNetworkInfo";

export const Incomes = () => {
  const { account, chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const userTotalIncome = useTotalReferralIncome(account);
  const userTokenBalanceWei = useTokenBalance(
    currentNetwork?.Token?.ContractAddress,
    account
  );
  return (
    <CardContainer>
      <Heading size="md">Incomes</Heading>
      <Center w={200}>
        <Divider />
      </Center>
      <BalancesCard
        currencyName={`Staking Income`}
        currencyValue={`${userTotalIncome?.rewardPaidStaking.toFixed(3)} ${
          currentNetwork?.Token?.Symbol
        }`}
        logo={currentNetwork?.Token?.Logo}
        isLoaded={userTokenBalanceWei ? true : false}
      ></BalancesCard>
      <BalancesCard
        currencyName={`Referral Income`}
        currencyValue={`${userTotalIncome?.rewardPaidETH.toFixed(3)} ${
          currentNetwork?.Native?.Symbol
        }`}
        logo={currentNetwork?.Native?.Logo}
        isLoaded={userTokenBalanceWei ? true : false}
      ></BalancesCard>
      <BalancesCard
        currencyName={`Referral Income`}
        currencyValue={`${userTotalIncome?.rewardPaidUSD.toFixed(3)} ${
          currentNetwork?.USDT?.Symbol
        }`}
        logo={currentNetwork?.USDT?.Logo}
        isLoaded={userTokenBalanceWei ? true : false}
      ></BalancesCard>
    </CardContainer>
  );
};
