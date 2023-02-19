import {
  Button,
  Heading,
  HStack,
  Input,
  useClipboard,
  VStack,
} from "@chakra-ui/react";
import { Polygon, useEthers } from "@usedapp/core";
import React from "react";
import { ConnectWalletButton } from "../../../components/ConnectWalletButton";
import { userReferralLink, useSupportedNetworkInfo } from "../../../hooks";

export const ReferralLink = () => {
  const { account, chainId } = useEthers();
  const { onCopy, hasCopied } = useClipboard(account!);
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  return (
    <VStack>
      <Heading size="lg" px={10} textAlign="center" maxW="xl">
        {account
          ? "Your referral link"
          : "Connect wallet to generate your referral link."}
      </Heading>
      {account ? (
        <VStack>
          <Input
            minW={300}
            borderRadius="xl"
            value={userReferralLink(account)}
            isReadOnly
          ></Input>
          <HStack>
            <Button
              h={12}
              colorScheme="green"
              borderRadius="xl"
              onClick={onCopy}
            >
              {hasCopied ? "Copied" : "Copy"}
            </Button>
            <Button
              h={12}
              colorScheme="pink"
              borderRadius="xl"
              as="a"
              href={currentNetwork?.Network.getExplorerAddressLink(account)}
              target="_blank"
            >
              Open in explorer
            </Button>
          </HStack>
        </VStack>
      ) : (
        <ConnectWalletButton />
      )}
    </VStack>
  );
};
