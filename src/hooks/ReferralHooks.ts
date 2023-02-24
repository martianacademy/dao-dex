import { useCall, useEthers } from "@usedapp/core";
import { BigNumber, utils } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { AddressZero, useSupportedNetworkInfo } from "./SupportedNetworkInfo";

const useCallHook = (methodName: string, arg: any[]) => {
  const { chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const { value, error } =
    useCall(
      currentNetwork?.ReferralContractAddress && {
        contract: currentNetwork?.ReferralInterface,
        method: methodName,
        args: arg,
      }
    ) ?? {};

  if (error) {
    console.error("Referral Hooks", error.message);
    return undefined;
  }
  return value;
};

export const useDefaultReferrer = (): string => {
  const value = useCallHook("getDefaultReferrer", []);
  return value?.[0];
};

export const useReferralIsUserHasReferrer = (
  address: string | undefined
): boolean => {
  const value = useCallHook("hasReferrer", [address ?? AddressZero]);
  return value?.[0] ?? false;
};

export const useTotalReferralIncome = (
  address: string | undefined
): {
  rewardPaidETH: number;
  rewardPaidStaking: number;
  rewardPaidUSD: number;
} => {
  const { chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const value = useCallHook("getUserTotalRewardPaid", [address ?? AddressZero]);
  const rewardPaidETH = value ? Number(formatEther(value?.rewardPaidETH)) : 0;
  const rewardPaidStaking = value
    ? Number(
        utils.formatUnits(
          value?.rewardPaidStaking,
          currentNetwork?.Token?.Decimals
        )
      )
    : 0;
  const rewardPaidUSD = value
    ? Number(
        utils.formatUnits(value?.rewardPaidUSD, currentNetwork?.USDT?.Decimals)
      )
    : 0;

  const valueObject = {
    rewardPaidETH,
    rewardPaidStaking,
    rewardPaidUSD,
  };
  return valueObject;
};

export const useUserReferees = (
  address: string | undefined
): { teamArray: string[] | []; teamCount: number } => {
  const value = useCallHook("getUserTeamReferee", [address ?? AddressZero]);
  const teamArray = value ? value?.userTeamReferees : [];
  const teamCount = value?.userTeamRefereeCount
    ? Number(value?.userTeamRefereeCount.toString())
    : 0;

  const valueObject = {
    teamArray,
    teamCount,
  };

  return valueObject;
};
