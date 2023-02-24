import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Skeleton,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContractFunction, useEthers, useTokenBalance } from "@usedapp/core";
import { util } from "chai";
import { utils } from "ethers";
import React, { useEffect, useState } from "react";
import {
  useStakingAnalytics,
  useStakingMinValue,
} from "../../hooks/StakingHooks";
import {
  useIsUserHaveSufficientAllowance,
  useIsUserHaveSufficientBalance,
} from "../../hooks/UtilsHooks";
import {
  TokenSymbol,
  useSupportedNetworkInfo,
} from "../../hooks/SupportedNetworkInfo";
import { StakeDurationRadio } from "../UI";
import { StakeDurationContainer } from "./Containers/StakeDurationContainer";
import { StakeInputContainer } from "./Containers/StakeInputContainer";
import {
  ModalAllowance,
  ModalChangeCoin,
  ModalStakeTransaction,
  ModalTransactionInProgress,
  ModalTransactionSuccess,
} from "../Modals";

export const StakeUI = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { account, chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const stakingAnalytics = useStakingAnalytics();
  const minStakingValue = useStakingMinValue();

  const userTokenBalanceWei = useTokenBalance(
    currentNetwork?.Token?.ContractAddress,
    account
  );

  const userTokenBalance: number = userTokenBalanceWei
    ? Number(
        utils.formatUnits(userTokenBalanceWei, currentNetwork?.Token?.Decimals)
      )
    : 0;

  const [userInput, setUserInput] = useState<{
    tokenInput: undefined | number;
    duration: number | undefined;
    apy: number | undefined;
  }>({
    tokenInput: undefined,
    duration: 86400 * 30 * 12,
    apy: 48,
  });

  const [selectedCoin, setSelectedCoin] = useState<"Token" | "USDT">("Token");

  const { send, state, resetState, events } = useContractFunction(
    currentNetwork?.StakingInterface,
    "stake"
  );

  const [transactionStatus, setTransactionStatus] = useState<
    "No" | "Mining" | "Transaction" | "Success" | "Loading"
  >("No");

  const [transactionReceipt, setTransactionReceipt] = useState<
    undefined | string
  >(undefined);

  const isUserHaveSufficientAllowance = useIsUserHaveSufficientAllowance(
    userInput?.tokenInput,
    currentNetwork?.Token?.ContractAddress,
    currentNetwork?.Token?.Decimals,
    account,
    currentNetwork?.StakingContractAddress
  );

  const isUserHaveSufficientBalance = useIsUserHaveSufficientBalance(
    userInput?.tokenInput,
    userTokenBalance
  );

  const isUserTokenInputGreaterMinContribution = (): boolean => {
    if (userInput?.tokenInput && userInput?.tokenInput >= minStakingValue)
      return true;
    return false;
  };

  const handleTokenInput = (e: any) => {
    setUserInput((prev) => ({
      ...prev,
      tokenInput: e.target.value,
    }));
  };

  const handleValueButtons = (value: number) => {
    const tokenValue = (userTokenBalance * value) / 100;
    setUserInput((prev) => ({
      ...prev,
      tokenInput: tokenValue,
    }));
  };

  const HandleStake = () => {
    if (!isUserHaveSufficientBalance) {
      toast({
        title: "Insufficient balance.",
        description: "You dont have sufficient balance to stake.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (!isUserTokenInputGreaterMinContribution) {
      toast({
        title: "Insufficient balance.",
        description: `Min staking value is ${minStakingValue} ${TokenSymbol}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      onOpen();
    }
  };
  const proceedStake = async () => {
    try {
      if (selectedCoin === "Token") {
        setTransactionStatus("Loading");
        await send(
          utils.parseUnits(
            (userInput?.tokenInput ?? 0).toString(),
            currentNetwork?.Token?.Decimals
          ),
          userInput?.duration?.toString(),
          {
            value: 0,
          }
        );
      }
      setTransactionStatus("No");
    } catch (err) {
      console.log(err);
      setTransactionStatus("No");
    }
  };

  useEffect(() => {
    if (state.status === "Mining") {
      setTransactionStatus("Mining");
    } else if (state.status === "Success") {
      setTransactionStatus("Success");
      selectedCoin === "Token" &&
        setTransactionReceipt(state?.receipt?.transactionHash);

      setUserInput((prev) => ({
        ...prev,
        tokenInput: 0,
      }));
      setTimeout(() => {
        setTransactionStatus("No");
        resetState();
        onClose();
      }, 30000);
    }
  }, [state.status]);

  return (
    <VStack
      w={300}
      borderRadius="50px"
      p={5}
      bgColor={useColorModeValue("white", "gray.900")}
    >
      <Skeleton
        borderRadius="25px"
        w="full"
        isLoaded={stakingAnalytics?.stakingRewardRates.length > 0}
      >
        <StakeInputContainer
          onChangeInput={handleTokenInput}
          userBalance={userTokenBalance}
          value={userInput?.tokenInput}
          onClickMin={() => handleValueButtons(25)}
          onClick50={() => handleValueButtons(50)}
          onClick75={() => handleValueButtons(75)}
          onClickMax={() => handleValueButtons(99)}
        />
      </Skeleton>

      <RadioGroup defaultValue="12">
        <HStack>
          {stakingAnalytics &&
            stakingAnalytics?.stakingRewardDurations.map((value, key) => {
              return (
                <VStack key={key} spacing={1}>
                  <StakeDurationRadio
                    value={(Number(value.toString()) / 86400 / 30)
                      .toFixed(0)
                      .toString()}
                    onClick={() =>
                      setUserInput((prev) => ({
                        ...prev,
                        duration: Number(value.toString()),
                        apy: Number(
                          stakingAnalytics?.stakingRewardRates[key].toString()
                        ),
                      }))
                    }
                  />
                  <Text fontSize="xs">Months</Text>
                  <HStack spacing={1}>
                    <Text fontSize="xs" color="orange.400">
                      {Number(
                        stakingAnalytics?.stakingRewardRates[key].toString()
                      )}
                      %
                    </Text>
                    <Text fontSize="xs">APY</Text>
                  </HStack>
                </VStack>
              );
            })}
        </HStack>
      </RadioGroup>
      <Skeleton
        borderRadius="25px"
        w="full"
        isLoaded={stakingAnalytics?.stakingRewardRates.length > 0}
      >
        <Button
          w="full"
          h={20}
          borderRadius="3xl"
          colorScheme="orange"
          bg="orange.400"
          _hover={{
            bg: "orange.500",
          }}
          isDisabled={
            !account ||
            userInput!?.tokenInput === 0 ||
            userInput!?.tokenInput === undefined
          }
          onClick={HandleStake}
        >
          {account ? "Stake" : "Connect Wallet to stake"}
        </Button>
      </Skeleton>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={50}>
          {transactionStatus === "Success" ? (
            <ModalTransactionSuccess
              transactionHash={transactionReceipt ? transactionReceipt : ""}
              onClose={onClose}
            />
          ) : transactionStatus === "Mining" ? (
            <ModalTransactionInProgress />
          ) : !isUserHaveSufficientAllowance ? (
            <ModalAllowance
              tokenName={"Token"}
              valueToApprove={userInput?.tokenInput!}
              spenderAddress={currentNetwork?.StakingContractAddress}
              onClose={onClose}
            />
          ) : (
            <ModalStakeTransaction
              onClose={onClose}
              inputCurrencyName={selectedCoin}
              inputCurrencyValue={userInput?.tokenInput ?? 0}
              stakingDuration={Number(
                (userInput?.duration! / 86400 / 30).toFixed(0)
              )}
              stakingAPY={userInput?.apy!}
              onClickProceed={proceedStake}
              onLoading={transactionStatus === "Loading"}
            />
          )}
        </ModalContent>
      </Modal>
    </VStack>
  );
};
