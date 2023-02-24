import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  VStack,
  Wrap,
} from "@chakra-ui/react";

const FeatureCard = ({
  stakingDuration,
  apy,
}: {
  stakingDuration: number;
  apy: number;
}) => {
  return (
    <Card w={170} borderRadius="50px">
      <VStack>
        <CardHeader fontSize="xl" fontWeight="bold">
          {stakingDuration} Months
        </CardHeader>
        <CardBody>
          <Heading>{apy}%</Heading>
          <Heading size="md">APY</Heading>
        </CardBody>
        <CardFooter>
          <Button w="full" borderRadius="xl" colorScheme="pink">
            Stake Now
          </Button>
        </CardFooter>
      </VStack>
    </Card>
  );
};

export const StakingRewards = () => {
  return (
    <Wrap w="full" align="center" justify="center" spacing={5}>
      <FeatureCard stakingDuration={3} apy={36}></FeatureCard>
      <FeatureCard stakingDuration={6} apy={42}></FeatureCard>
      <FeatureCard stakingDuration={9} apy={48}></FeatureCard>
      <FeatureCard stakingDuration={12} apy={54}></FeatureCard>
    </Wrap>
  );
};
