import {
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FaHiking, FaHome, FaPiggyBank, FaRoad, FaUsers } from "react-icons/fa";
import { TbChartDonut } from "react-icons/tb";
import { CiMoneyCheck1 } from "react-icons/ci";
import { TokenSymbol } from "../../hooks";
import { Link as ScrollLink, animateScroll } from "react-scroll";

export const NavLinks = () => {
  return (
    <Stack
      justify={[
        "flex-start",
        "flex-start",
        "flex-start",
        "flex-start",
        "center",
      ]}
      align={["flex-start", "flex-start", "flex-start", "flex-start", "center"]}
      direction={["column", "column", "column", "column", "row"]}
    >
      {/* <Button
        padding={2}
        px={3}
        colorScheme="green"
        variant="ghost"
        borderRadius="xl"
        leftIcon={<FaHome />}
      >
        Home
      </Button> */}
      <ScrollLink to="about-page" smooth={true}>
        <Button
          padding={2}
          px={3}
          colorScheme="green"
          variant="ghost"
          borderRadius="xl"
          leftIcon={<FaHiking />}
          fontSize={["xl", "xl", "xl", "xl", "md"]}
        >
          About {TokenSymbol}
        </Button>
      </ScrollLink>
      <ScrollLink to="tokenomics-page" smooth={true}>
        <Button
          padding={2}
          px={3}
          colorScheme="green"
          variant="ghost"
          borderRadius="xl"
          leftIcon={<TbChartDonut />}
          fontSize={["xl", "xl", "xl", "xl", "md"]}
        >
          Tokenomics
        </Button>
      </ScrollLink>
      <ScrollLink to="roadmap-page" smooth={true}>
        <Button
          padding={2}
          px={3}
          colorScheme="green"
          variant="ghost"
          borderRadius="xl"
          leftIcon={<FaRoad />}
          fontSize={["xl", "xl", "xl", "xl", "md"]}
        >
          Roadmap
        </Button>
      </ScrollLink>
      <ScrollLink to="presale-page" smooth={true}>
        <Button
          padding={2}
          px={3}
          colorScheme="green"
          variant="ghost"
          borderRadius="xl"
          leftIcon={<CiMoneyCheck1 />}
          fontSize={["xl", "xl", "xl", "xl", "md"]}
        >
          Presale
        </Button>
      </ScrollLink>
      <ScrollLink to="referral-page" smooth={true}>
        <Button
          padding={2}
          px={3}
          colorScheme="green"
          variant="ghost"
          borderRadius="xl"
          leftIcon={<FaUsers />}
          fontSize={["xl", "xl", "xl", "xl", "md"]}
        >
          Referral
        </Button>
      </ScrollLink>
      <ScrollLink to="staking-page" smooth={true}>
        <Button
          padding={2}
          px={3}
          colorScheme="green"
          variant="ghost"
          borderRadius="xl"
          leftIcon={<FaPiggyBank />}
          fontSize={["xl", "xl", "xl", "xl", "md"]}
        >
          Staking
        </Button>
      </ScrollLink>
    </Stack>
  );
};
