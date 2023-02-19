import { Card, Icon, Image, VStack, Wrap } from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  BithumbLogoSVG,
  BuyUCoinLogoSVG,
  CoinbaseLogoSVG,
  HuboiLogoSVG,
  KucoinLogoSVG,
  OKXLogoSVG,
} from "../../../assets";

const FeatureCard = ({ image }: { image: string }) => {
  return (
    <Card w={150} borderRadius="50px" bgColor="white">
      <VStack>
        <Image src={image} boxSize="120px" p={2}></Image>
      </VStack>
    </Card>
  );
};

export const ExchangeList = () => {
  return (
    <Wrap w="full" spacing={5} p={5} align="center" justify="center">
      <FeatureCard image={BuyUCoinLogoSVG}></FeatureCard>
      <FeatureCard image={BithumbLogoSVG}></FeatureCard>
      <FeatureCard image={CoinbaseLogoSVG}></FeatureCard>
      <FeatureCard image={HuboiLogoSVG}></FeatureCard>
      <FeatureCard image={KucoinLogoSVG}></FeatureCard>
      <FeatureCard image={OKXLogoSVG}></FeatureCard>
    </Wrap>
  );
};
