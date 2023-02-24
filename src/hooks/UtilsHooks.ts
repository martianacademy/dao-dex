import { useTokenAllowance } from "@usedapp/core";
import { formatUnits } from "ethers/lib/utils";

export const useIsUserHaveSufficientAllowance = (
  value: number | undefined,
  tokenAddress: string | false | 0 | null | undefined,
  tokenDecimals: number,
  ownerAddress: string | false | 0 | null | undefined,
  spenderAddress: string | false | 0 | null | undefined
): boolean => {
  const userAllowanceWei = useTokenAllowance(
    tokenAddress,
    ownerAddress,
    spenderAddress
  );

  const userAllowance = userAllowanceWei
    ? Number(formatUnits(userAllowanceWei, tokenDecimals))
    : 0;
  if (value && value <= userAllowance) return true;
  return false;
};

export const useIsUserHaveSufficientBalance = (
  value: number | undefined,
  balance: number
): boolean => {
  if (value && value <= balance) return true;
  return false;
};
