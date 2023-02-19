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
import { useSupportedNetworkInfo } from "../../../hooks";
import { InputContainer } from "../../UI";

export const NativeContainer = ({
  image,
  currencyName,
  value,
  userBalance,
}: {
  image?: string;
  currencyName?: string;
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
            <Image
              src={image ?? currentNetwork?.Native?.Logo ?? PolygonLogoSVG}
              boxSize={5}
            ></Image>
            <Text>
              {currencyName ??
                currentNetwork?.Native?.Symbol ??
                Polygon?.nativeCurrency?.name}
            </Text>
            <Spacer />
            <Text>{userBalance ? userBalance : 0}</Text>
          </HStack>
        </FormLabel>
        <Input borderRadius="xl" placeholder="0.0" h={14} value={value}></Input>
      </FormControl>
    </InputContainer>
  );
};
