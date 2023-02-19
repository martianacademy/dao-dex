import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  Highlight,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BlockchainWorkersSVG } from "../../../assets";

const MotionImage = motion(Image);

export function Header() {
  const navigate = useNavigate();
  return (
    <VStack
      w="full"
      minH="85vh"
      zIndex={1111}
      bgImage={BlockchainWorkersSVG}
      bgRepeat="no-repeat"
      bgPos="bottom"
      bgSize={["250%", "250%", "200%", "150%", "100%"]}
    >
      <Container maxW={"8xl"} pb={[150, 150, 100, 0]} zIndex={1}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
        >
          <Heading
            fontWeight={900}
            fontSize={["4xl", "5xl", "6xl", "7xl", "8xl"]}
            lineHeight={"110%"}
          >
            A Rapidly Growing{" "}
            <Text as={"span"} color={"orange.400"}>
              Platform for Decentralization
            </Text>
          </Heading>
          <Text maxW={"3xl"} fontSize="xl">
            <Highlight
              query={["Metaverse", "Web3", "DeFi", "Exchange", "Blockchain"]}
              styles={{
                px: "2",
                py: "2.5px",
                rounded: "full",
                bg: "green.500",
                color: "white",
              }}
            >
              DaoDex Protocol is working on decentralized platforms like
              Metaverse, Web3, DeFi, Exchange & Blockchain to be integrated with
              OpenAI Technology. So that things can be automatted securely.
            </Highlight>
          </Text>
          <HStack>
            <Button
              rounded={"full"}
              px={6}
              colorScheme={"orange"}
              bg={"orange.400"}
              _hover={{ bg: "orange.500" }}
              h={16}
              onClick={() => navigate("swap")}
            >
              Participate in Presale
            </Button>
            <Button
              rounded={"full"}
              px={6}
              rightIcon={<ChevronRightIcon />}
              h={16}
            >
              Learn more
            </Button>
          </HStack>
        </Stack>
      </Container>
    </VStack>
  );
}
