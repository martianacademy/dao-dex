import { Image, Text, VStack, Wrap } from "@chakra-ui/react";
import {
  CoinbaseWalletConnector,
  MetamaskConnector,
  useEthers,
} from "@usedapp/core";
import { motion } from "framer-motion";
import {
  CoinbaseWalletLogoSVG,
  MetamaskWalletLogoSVG,
  TrustWalletLogoSVG,
  WalletConnectLogoSVG,
} from "../../assets";
import { DeepLinks } from "../../hooks/SupportedNetworkInfo";

const MotionVStack = motion(VStack);

const WalletContainer = ({
  logo,
  name,
  onClick,
}: {
  logo: string;
  name: string;
  onClick?: () => void;
}) => {
  return (
    <MotionVStack
      whileHover={{
        y: -10,
      }}
      whileTap={{
        scale: 0.95,
      }}
      cursor="pointer"
    >
      <Image
        src={logo}
        boxSize={12}
        p={1}
        bgColor="green.100"
        borderRadius="xl"
        borderWidth="thin"
        onClick={onClick}
      ></Image>
      <Text fontSize="sm" fontWeight="semibold">
        {name}
      </Text>
    </MotionVStack>
  );
};

export const WalletConnectors = () => {
  const { error, activate, activateBrowserWallet } = useEthers();
  const handleConnectMetamask = async () => {
    const MetamaskProvider = new MetamaskConnector();
    if (window.ethereum) {
      try {
        await activate(MetamaskProvider);
      } catch (err: any) {
        console.log(err);
      }
    } else {
      window.location.href = `${DeepLinks.metamask}`;
    }
  };
  const handleConnectTrustWallet = async () => {
    if (window.ethereum) {
      try {
        activateBrowserWallet();
      } catch (err) {
        console.log(err);
      }
    } else {
      window.location.href = `${DeepLinks.trustwallet}`;
    }
  };
  const handleConnectCoinbaseWallet = async () => {
    const CoinbaseProvider = new CoinbaseWalletConnector();
    if (window.ethereum) {
      try {
        await activate(CoinbaseProvider);
      } catch (err) {
        console.log(err);
      }
    } else {
      window.location.href = `${DeepLinks.coinbase}`;
    }
  };
  const handleConnectWalletConnect = async () => {
    try {
      activateBrowserWallet({ type: "walletConnect" });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrap py={10} spacing={5} align="center" justify="center">
      <WalletContainer
        logo={MetamaskWalletLogoSVG}
        name="Metamask"
        onClick={handleConnectMetamask}
      ></WalletContainer>
      <WalletContainer
        logo={TrustWalletLogoSVG}
        name="Trustwallet"
        onClick={handleConnectTrustWallet}
      ></WalletContainer>
      <WalletContainer
        logo={CoinbaseWalletLogoSVG}
        name="Coinbase"
        onClick={handleConnectCoinbaseWallet}
      ></WalletContainer>
      <WalletContainer
        logo={WalletConnectLogoSVG}
        name="WalletConnect"
        onClick={handleConnectWalletConnect}
      ></WalletContainer>
    </Wrap>
  );
};
