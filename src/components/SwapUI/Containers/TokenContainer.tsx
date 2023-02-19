import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Polygon, useEtherBalance, useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { PolygonLogoSVG } from "../../../assets";
import {
  TokenLogo,
  TokenSymbol,
  useSupportedNetworkInfo,
} from "../../../hooks";
import { InputContainer } from "../../UI";

export const TokenContainer = ({
  value,
  userBalance,
}: {
  value?: string;
  userBalance?: string;
}) => {
  const { chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  return (
    <InputContainer>
      <FormControl>
        <FormLabel>
          <HStack>
            <Image src={TokenLogo} boxSize={5}></Image>
            <Text>{TokenSymbol}</Text>
            <Spacer />
            <Text>{userBalance ? userBalance : 0}</Text>
          </HStack>
        </FormLabel>
        <Input borderRadius="xl" placeholder="0.0" h={14} value={value}></Input>
      </FormControl>
    </InputContainer>
  );
};
