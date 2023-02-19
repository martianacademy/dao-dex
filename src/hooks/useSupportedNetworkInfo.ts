import {
  BNB,
  BSC,
  BSCTestnet,
  Polygon,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { Contract } from "ethers";
import {
  BNBLogoSVG,
  BSCScanLogoCircleLight,
  BUSDLogoSVG,
  PolygonLogoSVG,
  tokenLogo,
  USDTLogoSVG,
  tokenLogoPNG,
} from "../assets";

import { PresaleInterface, StakingInterface } from "../contracts";

export const TokenName = "DaoDex Exchange Coin";
export const TokenSymbol = "DaoDex";
export const TokenDecimals = 18;
export const TokenSupply = {
  number: 1000000000,
  string: "1 Billion",
};
export const TokenContractAddress = {
  bscTestnet: "0x534743c5ed9e11a95be72c8190ae627067cc33b7",
  polygon: "0x9c19247bd66f34e07c05bea8895d5d35dd49f253",
};
export const TokenLogo = tokenLogo;
export const website = window.location.href;
export const userReferralLink = (address: string | undefined) => {
  const webUrl = window.location.host;
  const referralLink = `${webUrl}/#/swap/${address}`;
  return referralLink;
};

export const DeepLinks = {
  trustwallet: `https://link.trustwallet.com/open_url?coin_id=966&url=${website}`,
  metamask: `https://metamask.app.link/dapp/${website}`,
  coinbase: `https://go.cb-w.com/dapp?cb_url=${website}`,
};

export const useSupportedNetworkInfo = {
  //   [BSC.chainId]: {
  //     ["Token"]: {
  //       ContractAddress: "0x534743c5Ed9E11a95bE72C8190ae627067cc33b7",
  //       Name: "DaoDex Exchange Coin",
  //       Symbol: "DaoDex",
  //       Decimals: 18,
  //       Logo: tokenLogo,
  //     },
  //     TokenContractAddress: "0x534743c5Ed9E11a95bE72C8190ae627067cc33b7",
  //     TokenOwner: "0x49827482bdeb954ef760d6e25e7bee0b9a422994",
  //     DefaultReferrer: "0xc7538C9d4afA40d9A888e89381B53e791E4F7721",
  //     TokenDecimals: 18,
  //     PresaleContractAddress: "0xE61701C0bcCBdABf0B0051b85968a1Ecc8FDcA78",
  //     PresaleInterface: new Contract(
  //       "0xE61701C0bcCBdABf0B0051b85968a1Ecc8FDcA78",
  //       PresaleInterface.abi
  //     ),
  //     StakingContractAddress: "0x7f3955EC4A3AA6845ae60f6b733dca146a268aBB",
  //     StakingInterface: new Contract(
  //       "0x7f3955EC4A3AA6845ae60f6b733dca146a268aBB",
  //       StakingInterface.abi
  //     ),
  //     ["USDT"]: {
  //       ContractAddress: "0x55d398326f99059fF775485246999027B3197955",
  //       Name: "Tether USDT",
  //       Symbol: "USDT",
  //       Decimals: 18,
  //       Logo: USDTLogoSVG,
  //     },
  //     ["BUSD"]: {
  //       ContractAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  //       Name: "Binance-Peg BUSD Token",
  //       Symbol: "BUSD",
  //       Decimals: 18,
  //       Logo: BUSDLogoSVG,
  //     },
  //     ["Native"]: {
  //       ContractAddress: "",
  //       Name: "Binance Smart Chain",
  //       Symbol: "BNB",
  //       Decimals: 18,
  //       Logo: BNBLogoSVG,
  //     },

  //     Network: BSC,
  //     NetworkName: BSC.chainName,
  //     NetworkSymbol: BSC.nativeCurrency?.symbol,
  //     NetworkLogoURL: BNBLogoSVG,
  //     NetworkChainId: BNB.chainId,
  //     NetworkRPCUrl: "https://bsc-dataseed.binance.org/",
  //     NetworkColor: "yellow.500",
  //     NetworkExplorerLink: BSC.blockExplorerUrl,
  //     NetworkExplorerName: "BscScan",
  //     NetworkExplorerLogo: BSCScanLogoCircleLight,
  //   },
  [BSCTestnet.chainId]: {
    ["Token"]: {
      ContractAddress: TokenContractAddress?.bscTestnet,
      Name: TokenName,
      Symbol: TokenSymbol,
      Decimals: TokenDecimals,
      Logo: TokenLogo,
    },
    TokenOwner: "0x7a0DeC713157f4289E112f5B8785C4Ae8B298F7F",
    TokenContractAddress: "0x0F0EC170DEAF700CAf78aA12806A22E3c8f7621a",
    PresaleContractAddress: "0x9b79Ec38Af60C7ad4D9082BEAA86D25AFF68F359",
    PresaleInterface: new Contract(
      "0x9b79Ec38Af60C7ad4D9082BEAA86D25AFF68F359",
      PresaleInterface.abi
    ),
    StakingContractAddress: "0xD021F0c34C02Ec2Bf6D80905c23bafad0482d1ea",
    StakingInterface: new Contract(
      "0xD021F0c34C02Ec2Bf6D80905c23bafad0482d1ea",
      StakingInterface.abi
    ),
    DefaultReferrer: "0xc7538C9d4afA40d9A888e89381B53e791E4F7721",
    ["USDT"]: {
      ContractAddress: "0xbfA0e2F4b2676c62885B1033670C71cdefd975fB",
      Name: "Tether USDT",
      Symbol: "USDT",
      Decimals: 6,
      Logo: USDTLogoSVG,
    },
    ["BUSD"]: {
      ContractAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      Name: "Binance-Peg BUSD Token",
      Symbol: "BUSD",
      Decimals: 18,
      Logo: BUSDLogoSVG,
    },
    ["Native"]: {
      ContractAddress: "",
      Name: "Binance Smart Chain Testnet",
      Symbol: "tBNB",
      Decimals: 18,
      Logo: BNBLogoSVG,
    },
    Network: BSCTestnet,
    NetworkName: "Binance Smart Chain Testnet",
    NetworkSymbol: "BNB",
    NetworkChainId: 97,
    NetworkLogoURL: BNBLogoSVG,
    NetworkRPCUrl: "https://data-seed-prebsc-1-s3.binance.org:8545",
    NetworkColor: "yellow.500",
    NetworkExplorerLink: BSCTestnet.blockExplorerUrl,
    NetworkExplorerName: "BscScanTestnet",
    NetworkExplorerLogo: BSCScanLogoCircleLight,
  },
  [Polygon.chainId]: {
    ["Token"]: {
      ContractAddress: TokenContractAddress?.polygon,
      Name: TokenName,
      Symbol: TokenSymbol,
      Decimals: TokenDecimals,
      Logo: TokenLogo,
    },
    TokenOwner: "0xb35963e0ab2141cd4ab743e7a35d8772f3cf0447",
    TokenContractAddress: "0x0F0EC170DEAF700CAf78aA12806A22E3c8f7621a",
    PresaleContractAddress: "0x9b79Ec38Af60C7ad4D9082BEAA86D25AFF68F359",
    PresaleInterface: new Contract(
      "0x9b79Ec38Af60C7ad4D9082BEAA86D25AFF68F359",
      PresaleInterface.abi
    ),
    StakingContractAddress: "0xD021F0c34C02Ec2Bf6D80905c23bafad0482d1ea",
    StakingInterface: new Contract(
      "0xD021F0c34C02Ec2Bf6D80905c23bafad0482d1ea",
      StakingInterface.abi
    ),
    DefaultReferrer: "0xb35963e0ab2141cd4ab743e7a35d8772f3cf0447",
    ["USDT"]: {
      ContractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      Name: "Tether USDT",
      Symbol: "USDT",
      Decimals: 6,
      Logo: USDTLogoSVG,
    },
    ["Native"]: {
      ContractAddress: "",
      Name: "Polygon",
      Symbol: "Matic",
      Decimals: 18,
      Logo: PolygonLogoSVG,
    },
    Network: Polygon,
    NetworkName: "Polygon",
    NetworkSymbol: "MATIC",
    NetworkChainId: 137,
    NetworkLogoURL: PolygonLogoSVG,
    NetworkRPCUrl: "https://polygon-mainnet.public.blastapi.io",
    NetworkColor: "purple.500",
    NetworkExplorerLink: Polygon.blockExplorerUrl,
    NetworkExplorerName: "PolygonScan",
    NetworkExplorerLogo: PolygonLogoSVG,
  },
};
