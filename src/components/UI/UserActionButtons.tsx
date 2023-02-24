import { CheckIcon, CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonProps,
  HStack,
  IconButton,
  Link,
  useClipboard,
} from "@chakra-ui/react";
import { getExplorerAddressLink } from "@usedapp/core";
import React from "react";

export const UserActionButtons = ({
  address,
  explorerLink,
  style,
}: {
  address: string | undefined;
  explorerLink: string;
  style?: ButtonProps;
}) => {
  const { onCopy, hasCopied } = useClipboard(address!);
  return (
    <HStack>
      <IconButton
        aria-label="User Address Copy Button"
        icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
        onClick={onCopy}
        {...style}
      ></IconButton>
      <Link href={explorerLink} target="_blank">
        <IconButton
          aria-label="User Address Explorer Link Icon"
          icon={<ExternalLinkIcon />}
          {...style}
        ></IconButton>
      </Link>
    </HStack>
  );
};
