import {
  Card,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  useColorModeValue,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaPlug, FaTag } from "react-icons/fa";
import { GiFlamer } from "react-icons/gi";
import { VscSymbolNamespace } from "react-icons/vsc";
import { PolygonLogoSVG, USDTLogoSVG } from "../../../assets";
import {
  TokenName,
  TokenSupply,
  TokenSymbol,
} from "../../../hooks/SupportedNetworkInfo";

const FeatureCard = ({
  icon,
  color,
  heading,
  text,
}: {
  icon: IconType;
  color: string;
  heading: string;
  text: string;
}) => {
  return (
    <Card
      p={5}
      w={175}
      h={300}
      borderRadius="50px"
      align="center"
      justify="center"
    >
      <VStack>
        <Icon as={icon} boxSize={14} color={color}></Icon>
        <Heading size="md" textAlign="center">
          {heading}
        </Heading>
        <Heading size="sm" opacity={0.7}>
          {text}
        </Heading>
      </VStack>
    </Card>
  );
};

export const PresaleFeatures = () => {
  return (
    <VStack spacing={20} py={50}>
      <Wrap
        w="full"
        spacing={[5, 10, 20]}
        align="center"
        justify="center"
        p={5}
      >
        <FeatureCard
          icon={GiFlamer}
          color="red.300"
          heading={TokenName}
          text="Token Name"
        ></FeatureCard>
        <FeatureCard
          icon={VscSymbolNamespace}
          color="pink.300"
          heading={TokenSymbol}
          text="Token Symbol"
        ></FeatureCard>
        <FeatureCard
          icon={FaPlug}
          color="orange.300"
          heading={TokenSupply.string}
          text="Max Supply"
        ></FeatureCard>
        <FeatureCard
          icon={FaTag}
          color="green.300"
          heading="$0.10"
          text="ICO Price"
        ></FeatureCard>
      </Wrap>
      <VStack>
        <HStack spacing={14}>
          <Image src={PolygonLogoSVG} boxSize={75}></Image>
          <Center h={10}>
            <Divider orientation="vertical"></Divider>
          </Center>
          <Image src={USDTLogoSVG} boxSize={75}></Image>
        </HStack>
        <Heading size="md" textAlign="center">
          MATIC & USDT
        </Heading>
        <Heading size="sm" opacity={0.7} textAlign="center">
          Accepted Currency
        </Heading>
      </VStack>
    </VStack>
  );
};
