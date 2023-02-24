import {
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  Button,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import React from "react";
import { FaArrowDown, FaUser, FaUserAstronaut, FaUsers } from "react-icons/fa";
import {
  BalancesCard,
  CardContainer,
  UserActionButtons,
  UserReferralLink,
} from "../../../../components";
import { useUserReferees } from "../../../../hooks/ReferralHooks";
import {
  userReferralLink,
  useSupportedNetworkInfo,
} from "../../../../hooks/SupportedNetworkInfo";

export const Team = () => {
  const { account, chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const userTeam = useUserReferees(account);

  return (
    <CardContainer>
      <Heading size="md">Team</Heading>
      <Center w={200}>
        <Divider />
      </Center>
      <BalancesCard
        currencyName="Total Team"
        currencyValue={userTeam?.teamCount.toString()}
        isLoaded={account ? true : false}
        icon={FaUsers}
      ></BalancesCard>
      <Icon as={FaUserAstronaut} boxSize={10}></Icon>
      {userTeam?.teamArray.length > 0 ? (
        <VStack w="full">
          <Icon as={FaArrowDown} boxSize={10}></Icon>
          <Center minW={300}>
            <Divider />
          </Center>
          <Wrap p={5} align="center" justify="center" spacing={5}>
            {userTeam?.teamArray.map((address: string, key: number) => {
              return (
                <VStack key={key}>
                  <Icon as={FaUser} boxSize={7}></Icon>
                  <UserActionButtons
                    address={address}
                    explorerLink={currentNetwork?.Network?.getExplorerAddressLink(
                      address
                    )}
                    style={{
                      borderRadius: "xl",
                      size: "sm",
                    }}
                  ></UserActionButtons>
                </VStack>
              );
            })}
          </Wrap>
        </VStack>
      ) : (
        <Text>You have no team</Text>
      )}
      <UserReferralLink />
    </CardContainer>
  );
};
