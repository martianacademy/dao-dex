import { Box, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SecuredWorkersSVG } from "../../../assets";
import { SectionHeader } from "../../../components";
import { ContractAddress } from "./ContractAddress";
import { Features } from "./Features";
import { FeaturesButtonsLinks } from "./FeaturesButtonsLinks";
import { HeaderStrip } from "../../../components";

const MotionBox = motion(Box);

export const About = () => {
  return (
    <VStack
      id="about-page"
      w="full"
      spacing={10}
      bgImage={SecuredWorkersSVG}
      bgRepeat="no-repeat"
      bgPos="bottom"
      bgSize={["250%", "200%", "150%", "100%"]}
      pb={[150, 200, 250, 300]}
    >
      <HeaderStrip heading="What is DaoDex Protocol" bgColor="#ff0080" />
      <SectionHeader
        header="Decentralisation is future & we are here to contribute."
        text="DaoDex protocol is designed to contribute in decentralised eco system. DaoDex Exchange Token (DaoDex) is an ERC20 standard #crypto token.The organization is an Decentralised Autonomous Organization (DAO), means every big decisions will be take by community consensus & agreement. This feature is already integrate in our token. We are very facinating about flash loans, so we already integrated this our token too. We are automating every major process using AI, OpenAI Technology. Our main concern is user privacy & complete ownership."
      ></SectionHeader>
      <Features />
      <FeaturesButtonsLinks />
      <ContractAddress />
    </VStack>
  );
};
