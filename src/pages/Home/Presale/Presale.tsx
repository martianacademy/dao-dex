import { Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BullBearWorkerSVG } from "../../../assets";
import { HeaderStrip, SectionHeader } from "../../../components";
import { PresaleFeatures } from "./PresaleFeatures";
import { PresaleProgress } from "./PresaleProgress";
import { PresaleTiming } from "./PresaleTiming";

export const Presale = () => {
  const navigate = useNavigate();
  return (
    <VStack
      id="presale-page"
      w="full"
      pb={50}
      bgImage={BullBearWorkerSVG}
      bgRepeat="no-repeat"
      bgPos="bottom"
      bgSize={["300%", "250%", "200%", "150%", "100%"]}
      spacing={10}
    >
      <HeaderStrip
        heading="Let's be the part of the mission"
        bgColor="orange.400"
      />
      <SectionHeader
        header="An early opportunity for early birds. Let's walk tother."
        text="We just started the early public presale for our early believers. As coming in an initial offering is too risky, but its too profitable too. More risk more reward, very simple physics of investing."
      ></SectionHeader>
      <PresaleFeatures />
      <VStack w="full" px={5}>
        <PresaleProgress />
      </VStack>
      <PresaleTiming />
      <Button
        w={350}
        h={20}
        colorScheme="green"
        borderRadius="3xl"
        onClick={() => navigate("swap")}
      >
        Participate in presale now
      </Button>
    </VStack>
  );
};
