import { useEthers } from "@usedapp/core";
import React from "react";
import { useSupportedNetworkInfo } from "../../../hooks/SupportedNetworkInfo";
import { DrawerConnectWalletAuth } from "../DrawerConnectWalletAuth";
import { DrawerConnectWalletNoAuth } from "../DrawerConnectWalletNoAuth";
import { DrawerSwitchNetwork } from "../DrawerSwitchNetwork";

export const DrawerAuthFull = ({ onClose }: { onClose: () => void }) => {
  const { account, chainId } = useEthers();
  const currenNetwork = useSupportedNetworkInfo[chainId!];
  return account ? (
    currenNetwork ? (
      <DrawerConnectWalletAuth onClose={onClose} />
    ) : (
      <DrawerSwitchNetwork onClose={onClose} />
    )
  ) : (
    <DrawerConnectWalletNoAuth onClose={onClose} />
  );
};
