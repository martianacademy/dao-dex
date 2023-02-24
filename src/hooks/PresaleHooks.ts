import { useCall, useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useSupportedNetworkInfo } from "./SupportedNetworkInfo";

const useCallHook = (methodName: string, arg: any[]) => {
  const { chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const { value, error } =
    useCall(
      currentNetwork?.PresaleContractAddress && {
        contract: currentNetwork?.PresaleInterface,
        method: methodName,
        args: arg,
      }
    ) ?? {};

  if (error) {
    console.error("Presale Hooks", error.message);
    return undefined;
  }
  return value;
};

export const useETH_USDPrice = (): number => {
  const value = useCallHook("getETH_USDPrice", []);
  return value ? Number(formatEther(value[0])) : 0;
};

export const useToken_USDPrice = (): number => {
  const value = useCallHook("getPricePerUSD", []);
  return value ? Number(formatEther(value[0])) : 0;
};

export const useEthToToken = (ethValue: number): number => {
  const ethPrice = useETH_USDPrice();
  const tokenPrice = useToken_USDPrice();
  const ethToToken = ethValue * ethPrice * tokenPrice;
  return ethToToken;
};
export const useTokenToEth = () => {};

export const usePresaleMinContribution = (): {
  minContributionETH: number;
  minContributionUSDT: number;
} => {
  const value = useCallHook("minContribution", []);
  const minContributionETH: number = value
    ? Number(formatEther(value?.minContETH))
    : 0;

  const minContributionUSDT: number = value
    ? Number(formatEther(value?.minContUSD))
    : 0;

  const minContributionObject = {
    minContributionETH,
    minContributionUSDT,
  };
  return minContributionObject;
};

export const useHasReferrer = (address: string): boolean => {
  const value = useCallHook("hasReferrer", [address]);
  return value ? value?.isValidUpline : false;
};

export const useAccountMap = (address: string) => {
  const value = useCallHook("getAccountMap", [address]);
  return value ? value : {};
};

export const useUserTotalIncome = (address: string) => {
  const value = useCallHook("getUserTotalIncome", [address]);
  return value ? value : {};
};

export const useUserTotalBusiness = (address: string) => {
  const value = useCallHook("getUserTotalBusiness", [address]);
  return value ? value : {};
};
