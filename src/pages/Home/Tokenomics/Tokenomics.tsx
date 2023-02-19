import { VStack, Wrap } from "@chakra-ui/react";
import { BlockchainusageWorkerSVG } from "../../../assets";
import { HeaderStrip, SectionHeader } from "../../../components";
import { TokenomicsChart } from "./TokenomicsChart";
import { TokenomicsText } from "./TokenomicsText";

export const Tokenomics = () => {
  return (
    <VStack
      id="tokenomics-page"
      w="full"
      spacing={10}
      bgImage={BlockchainusageWorkerSVG}
      bgRepeat="no-repeat"
      bgPos="bottom"
      bgSize={["250%", "200%", "150%", "100%"]}
      pb={[250, 300, 350, 400]}
    >
      <HeaderStrip heading="Tokenomics" bgColor="pink.400" />
      <SectionHeader
        header="Designed for community, Designed for distribution."
        text="DaoDex protocol's token distribution is designed to grow and earn the
          community."
      ></SectionHeader>

      <Wrap w="full" justify="center" align="center">
        <TokenomicsChart />
        <VStack w="full" maxW={950} px={5}>
          <TokenomicsText />
        </VStack>
      </Wrap>
    </VStack>
  );
};
