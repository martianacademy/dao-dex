import { ChevronRightIcon, ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Polygon, useEthers } from "@usedapp/core";
import React from "react";
import { PolygonLogoSVG } from "../../../assets";
import { LogoContainer } from "../../../components";
import { TokenContractAddress } from "../../../hooks/SupportedNetworkInfo";

export const ContractAddress = () => {
  const { onCopy, hasCopied } = useClipboard(TokenContractAddress.polygon);
  const { chainId } = useEthers();
  return (
    <VStack spacing={5}>
      <LogoContainer />
      <HStack>
        <Heading size="lg">{Polygon.chainName}</Heading>
        <Heading size="lg">Network</Heading>
        <Image src={PolygonLogoSVG} boxSize={8}></Image>
      </HStack>
      <HStack spacing={5}></HStack>

      <Input
        value={TokenContractAddress.polygon}
        h={12}
        borderRadius="2xl"
        isReadOnly
        variant="filled"
        bgColor={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
      ></Input>

      <HStack>
        <Button h={12} borderRadius="2xl" onClick={onCopy} colorScheme="pink">
          {hasCopied
            ? "DaoDex Smart Contract Address Copied"
            : "Copy DaoDex Smart Contract Address"}
        </Button>
        {/* <Button
          as="a"
          h={12}
          borderRadius="2xl"
          rightIcon={<ExternalLinkIcon />}
          href={Polygon?.getExplorerAddressLink(TokenContractAddress.polygon)}
          target="_blank"
          colorScheme="pink"
        >
          Open in explorer
        </Button> */}
      </HStack>
    </VStack>
  );
};
