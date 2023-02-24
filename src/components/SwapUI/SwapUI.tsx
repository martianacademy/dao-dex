import {
  Button,
  Center,
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Spinner,
  Tag,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  useContractFunction,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { utils } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useETH_USDPrice,
  usePresaleMinContribution,
  useToken_USDPrice,
} from "../../hooks/PresaleHooks";
import {
  useDefaultReferrer,
  useReferralIsUserHasReferrer,
} from "../../hooks/ReferralHooks";
import {
  TokenSymbol,
  useSupportedNetworkInfo,
} from "../../hooks/SupportedNetworkInfo";
import {
  useIsUserHaveSufficientAllowance,
  useIsUserHaveSufficientBalance,
} from "../../hooks/UtilsHooks";
import {
  ModalAllowance,
  ModalSwapTransaction,
  ModalTransactionInProgress,
  ModalTransactionSuccess,
} from "../Modals";
import {
  NativeContainer,
  ReferrerContainer,
  TokenContainer,
} from "./Containers";

export const SwapUI = () => {
  const toast = useToast();
  const {
    isOpen: isOpenTransaction,
    onOpen: onOpenTransaction,
    onClose: onCloseTransaction,
  } = useDisclosure();
  const { account, chainId } = useEthers();
  const currentNetwork = useSupportedNetworkInfo[chainId!];
  const { referrerAddress } = useParams();
  const ethPrice = useETH_USDPrice();
  const tokenPrice = useToken_USDPrice();
  const minContribution = usePresaleMinContribution();
  const userETHBalanceWei = useEtherBalance(account);
  const userETHBalance = userETHBalanceWei
    ? Number(formatEther(userETHBalanceWei))
    : 0.0;
  const userTokenBalanceWei = useTokenBalance(
    currentNetwork?.Token?.ContractAddress,
    account
  );
  const userTokenBalance: number = userTokenBalanceWei
    ? Number(formatUnits(userTokenBalanceWei, currentNetwork?.Token?.Decimals))
    : 0.0;
  const userUSDTBalanceWei = useTokenBalance(
    currentNetwork?.USDT?.ContractAddress,
    account
  );
  const userUSDTBalance: number = userUSDTBalanceWei
    ? Number(formatUnits(userUSDTBalanceWei, currentNetwork?.USDT?.Decimals))
    : 0.0;

  const {
    send: sendBuyWithETH,
    state: stateBuyWithETH,
    resetState: resetStateBuyWithETH,
  } = useContractFunction(currentNetwork?.PresaleInterface, "BuyWithETH");

  const {
    send: sendBuyWithUSD,
    state: stateBuyWithUSD,
    resetState: resetStateBuyWithUSD,
  } = useContractFunction(currentNetwork?.PresaleInterface, "BuyWithUSD");

  const [transactionStatus, setTransactionStatus] = useState<
    "No" | "Mining" | "Transaction" | "Success" | "Loading"
  >("No");

  const [transactionReceipt, setTransactionReceipt] = useState<
    undefined | string
  >(undefined);

  const defaultReferrer = useDefaultReferrer();
  const isUserHaveReferrer = useReferralIsUserHasReferrer(account);
  const [userInput, setUserInput] = useState<{
    referrerAddress: string;
    ethInput: number | undefined;
    tokenInput: number | undefined;
  }>({
    referrerAddress: referrerAddress ?? "",
    ethInput: undefined,
    tokenInput: undefined,
  });
  const [selectedCoin, setSelectedCoin] = useState<"Native" | "USDT">("Native");
  const selectedCoinBalance = (): number => {
    if (selectedCoin === "USDT") return userUSDTBalance;
    return userETHBalance;
  };

  const selectedCoinPrice = (): number => {
    if (selectedCoin === "USDT") return 1;
    return ethPrice;
  };

  const isUserHaveSufficientAllowance = useIsUserHaveSufficientAllowance(
    userInput?.ethInput,
    currentNetwork?.USDT?.ContractAddress,
    currentNetwork?.USDT?.Decimals,
    account,
    currentNetwork?.PresaleContractAddress
  );

  const isUserHaveSufficientBalance = useIsUserHaveSufficientBalance(
    userInput?.ethInput,
    selectedCoinBalance()
  );

  const isUserInputGreaterThanMinContribution = (): boolean => {
    if (selectedCoin === "Native") {
      if (
        userInput?.ethInput &&
        userInput?.ethInput >= minContribution?.minContributionETH
      ) {
        return true;
      }
      return false;
    } else if (selectedCoin === "USDT") {
      if (
        userInput?.ethInput &&
        userInput?.ethInput >= minContribution?.minContributionUSDT
      ) {
        return true;
      }
      return false;
    }
    return false;
  };

  const handleDefaultReferrerInput = (e: any) => {
    setUserInput((prev) => ({
      ...prev,
      referrerAddress: e.target.value,
    }));
  };

  const handleETHInput = (e: any) => {
    setUserInput((props) => ({
      ...props,
      ethInput: e.target.value,
      tokenInput:
        e.target.value && e.target.value * selectedCoinPrice() * tokenPrice,
    }));
  };
  const handleValueButtons = (value: number) => {
    const ethVsalue = (selectedCoinBalance() * value) / 100;
    setUserInput((prev) => ({
      ...prev,
      ethInput: ethVsalue,
      tokenInput: ethVsalue * selectedCoinPrice() * tokenPrice,
    }));
  };
  const handleTokenInput = (e: any) => {
    setUserInput((prev) => ({
      ...prev,
      tokenInput: e.target.value,
      ethInput:
        e.target.value && e.target.value / selectedCoinPrice() / tokenPrice,
    }));
  };
  const handleSwap = () => {
    if (!isUserHaveSufficientBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You dont have sufficient balance to swap",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (!isUserInputGreaterThanMinContribution()) {
      toast({
        title: "Value less then min contribution.",
        description: `${currentNetwork?.[selectedCoin].Symbol} Value is less then MinContribution $20`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (userInput?.referrerAddress.length === 0) {
      toast({
        title: "No referrer selected",
        description: "Please enter the referrer address or select default one.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      onOpenTransaction();
    }
  };
  const proceedSwap = async () => {
    try {
      setTransactionStatus("Loading");
      if (selectedCoin === "Native") {
        await sendBuyWithETH(
          !isUserHaveReferrer
            ? userInput.referrerAddress
            : currentNetwork?.DefaultReferrer,
          8640000,
          {
            value: utils.parseEther(userInput?.ethInput?.toString()!),
          }
        );
      } else if (selectedCoin === "USDT") {
        await sendBuyWithUSD(
          !isUserHaveReferrer
            ? userInput.referrerAddress
            : currentNetwork?.DefaultReferrer,
          utils.parseUnits(
            userInput?.ethInput?.toString()!,
            currentNetwork?.USDT?.Decimals
          ),
          8640000,
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
    if (
      stateBuyWithETH.status === "Mining" ||
      stateBuyWithUSD.status === "Mining"
    ) {
      setTransactionStatus("Mining");
    } else if (
      stateBuyWithETH.status === "Success" ||
      stateBuyWithUSD.status === "Success"
    ) {
      setTransactionStatus("Success");
      selectedCoin === "Native" &&
        setTransactionReceipt(stateBuyWithETH?.receipt?.transactionHash);
      selectedCoin === "USDT" &&
        setTransactionReceipt(stateBuyWithUSD?.receipt?.transactionHash);

      setUserInput((prev) => ({
        ethInput: 0,
        tokenInput: 0,
        referrerAddress: "",
      }));
      setTimeout(() => {
        setTransactionStatus("No");
        resetStateBuyWithETH();
        resetStateBuyWithUSD();
        onCloseTransaction();
      }, 30000);
    }
  }, [stateBuyWithETH.status, stateBuyWithUSD.status]);

  return (
    <VStack
      w={300}
      borderRadius="50px"
      p={5}
      bgColor={useColorModeValue!("white", "gray.900")}
    >
      {!isUserHaveReferrer && (
        <Skeleton w="full" borderRadius={25} isLoaded={ethPrice ? true : false}>
          <ReferrerContainer
            InputValue={userInput?.referrerAddress}
            onClickClearButton={() =>
              setUserInput((prev) => ({
                ...prev,
                referrerAddress: "",
              }))
            }
            onClickDefaultReferrer={() => {
              setUserInput((prev) => ({
                ...prev,
                referrerAddress: defaultReferrer,
              }));
            }}
            onChangeInputValue={handleDefaultReferrerInput}
            isDisabled={referrerAddress ? true : false}
          />
        </Skeleton>
      )}

      <Skeleton w="full" borderRadius={25} isLoaded={ethPrice ? true : false}>
        <NativeContainer
          userBalance={selectedCoinBalance()}
          value={userInput?.ethInput}
          currencyName={currentNetwork?.[selectedCoin].Symbol}
          image={currentNetwork?.[selectedCoin]?.Logo}
          onClickNative={() => setSelectedCoin("Native")}
          onClickUSDT={() => setSelectedCoin("USDT")}
          onChange={handleETHInput}
          onClickMin={() => handleValueButtons(25)}
          onClick50={() => handleValueButtons(50)}
          onClick75={() => handleValueButtons(75)}
          onClickMax={() => handleValueButtons(99)}
        />
      </Skeleton>
      <Skeleton w="full" borderRadius={25} isLoaded={ethPrice ? true : false}>
        <TokenContainer
          userBalance={userTokenBalance}
          value={userInput?.tokenInput}
          onChange={handleTokenInput}
        />
      </Skeleton>
      <Skeleton w="full" borderRadius={25} isLoaded={ethPrice ? true : false}>
        <Center>
          {tokenPrice ? (
            <Tag borderRadius="xl" py={2} px={3}>
              1 {currentNetwork?.[selectedCoin]?.Symbol} ={" "}
              {(selectedCoinPrice() * tokenPrice).toFixed(2)} {TokenSymbol}
            </Tag>
          ) : (
            <Spinner size="sm" />
          )}
        </Center>
      </Skeleton>

      {/* <FormControl>
        <FormLabel textAlign="center">Please select staking duration</FormLabel>
        <StakeDurationRadio />
      </FormControl> */}
      <Skeleton w="full" borderRadius={25} isLoaded={ethPrice ? true : false}>
        <Button
          w="full"
          h={20}
          borderRadius="3xl"
          colorScheme="orange"
          _hover={{
            bg: "orange.500",
          }}
          isDisabled={!account || userInput?.ethInput! == 0}
          onClick={handleSwap}
        >
          {account ? "Swap" : "Connect Wallet to swap"}
        </Button>
      </Skeleton>
      <Modal isOpen={isOpenTransaction} onClose={onCloseTransaction} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="50px">
          {transactionStatus === "Success" ? (
            <ModalTransactionSuccess
              transactionHash={transactionReceipt ? transactionReceipt : ""}
              onClose={onCloseTransaction}
            />
          ) : transactionStatus === "Mining" ? (
            <ModalTransactionInProgress />
          ) : selectedCoin === "USDT" && !isUserHaveSufficientAllowance ? (
            <ModalAllowance
              tokenName={selectedCoin}
              valueToApprove={userInput?.ethInput!}
              spenderAddress={currentNetwork?.PresaleContractAddress}
              onClose={onCloseTransaction}
            />
          ) : (
            <ModalSwapTransaction
              inputCurrencyName={selectedCoin}
              inputCurrencyValue={userInput?.ethInput ? userInput?.ethInput : 0}
              outputCurrencyName="Token"
              outputCurrencyValue={
                userInput?.tokenInput ? userInput?.tokenInput : 0
              }
              onClickProceed={proceedSwap}
              onLoading={transactionStatus === "Loading"}
              onClose={onCloseTransaction}
            />
          )}
        </ModalContent>
      </Modal>
    </VStack>
  );
};
