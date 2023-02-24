import { useCall, useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { AddressZero, useSupportedNetworkInfo } from "./SupportedNetworkInfo";

const useCallHook = (methodName: string, arg: any[]) => {
  const { chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const { value, error } =
    useCall(
      currentNetwork?.StakingContractAddress && {
        contract: currentNetwork?.StakingInterface,
        method: methodName,
        args: arg,
      }
    ) ?? {};

  if (error) {
    console.error("Staking Hooks", error.message);
    return undefined;
  }
  return value;
};

export const useStakingAnalytics = (): {
  rewardDistributed: number;
  totalStakers: number;
  stakingRewardDurations: BigNumber[] | [];
  stakingRewardRates: BigNumber[] | [];
} => {
  const value = useCallHook("getStakingAnalystics", []);
  const rewardDistributed = value
    ? Number(formatEther(value?.rewardDistributed))
    : 0;
  const totalStakers = value ? Number(value?.stakers.toString()) : 0;
  const totalTokensStaked = value ? Number(formatEther(value?.tokenStaked)) : 0;
  const stakingRewardDurations = value ? value?.stakingRewardDurations : [];
  const stakingRewardRates = value ? value?.stakingRewardRates : [];
  const stakingAnalyticsObject = {
    rewardDistributed,
    totalStakers,
    totalTokensStaked,
    stakingRewardDurations,
    stakingRewardRates,
  };

  return stakingAnalyticsObject;
};

export const useStakingMinValue = (): {} => {
  const value = useCallHook("getStakingCapping", []);
  const minTokensToStake = value
    ? Number(formatEther(value?.minTokensToStake))
    : 0;
  return minTokensToStake;
};
