import { InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Spacer,
  Text,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { Polygon, useEtherBalance, useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { PolygonLogoSVG } from "../../../assets";
import {
  TokenLogo,
  TokenSymbol,
  useSupportedNetworkInfo,
} from "../../../hooks/SupportedNetworkInfo";
import { InputContainer } from "../../UI";

export const TokenContainer = ({
  value,
  userBalance,
  onChange,
}: {
  value?: number;
  userBalance?: number;
  onChange?: (e: any) => void;
}) => {
  return (
    <InputContainer>
      <FormControl>
        <FormLabel>
          <HStack>
            <Image src={TokenLogo} boxSize={5}></Image>
            <Text>{TokenSymbol}</Text>
            <Spacer />
            <Text noOfLines={1} fontSize="sm">
              {userBalance ? userBalance.toFixed(2) : 0}
            </Text>
            <Tooltip label={userBalance} borderRadius="xl">
              <Icon as={InfoIcon}></Icon>
            </Tooltip>
          </HStack>
        </FormLabel>
        <Input
          borderRadius="xl"
          placeholder="0.0"
          h={14}
          value={value}
          onChange={onChange}
        ></Input>
      </FormControl>
    </InputContainer>
  );
};
