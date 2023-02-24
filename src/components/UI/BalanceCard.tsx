import {
  Card,
  Heading,
  HStack,
  Image,
  Skeleton,
  Spacer,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

export const BalancesCard = ({
  currencyName,
  currencyValue,
  logo,
  icon,
  isLoaded,
}: {
  currencyName: string;
  currencyValue: string;
  logo?: string;
  icon?: IconType;
  isLoaded: boolean;
}) => {
  return (
    <Skeleton borderRadius="25px" isLoaded={isLoaded}>
      <Card
        borderRadius="3xl"
        minW={300}
        p={3}
        bgColor={useColorModeValue("white", "whiteAlpha.200")}
      >
        <HStack>
          <VStack w={200}>
            <Heading size="md" color="pink.500" fontWeight="semibold">
              {currencyName}
            </Heading>
            <Heading size="sm" wordBreak="break-all" fontWeight="semibold">
              {currencyValue}
            </Heading>
          </VStack>
          <Spacer />
          {logo && <Image src={logo} boxSize={10}></Image>}
          {icon && <Icon as={icon} boxSize={10}></Icon>}
        </HStack>
      </Card>
    </Skeleton>
  );
};
