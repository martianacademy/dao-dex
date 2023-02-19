import { Image, VStack } from "@chakra-ui/react";
import { RoadmapSVG } from "../../../assets";
import { HeaderStrip, SectionHeader } from "../../../components";

export const Ropadmap = () => {
  return (
    <VStack id="roadmap-page" w="full" spacing={10}>
      <HeaderStrip heading="Roadmap" bgColor="green.400"></HeaderStrip>
      <SectionHeader
        header="Organization without goal, without roadmap, nothing."
        text="We are dedicated and a long vision team. We are building ourselves on ethics and commitments. A roadmap is a small destinations of a long journey. So we have:"
      ></SectionHeader>
      <Image src={RoadmapSVG} w={["full", "full", "70%", "50%"]}></Image>
    </VStack>
  );
};
