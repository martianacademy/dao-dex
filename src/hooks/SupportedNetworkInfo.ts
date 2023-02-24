import {
  BNB,
  BSC,
  BSCTestnet,
  ERC20Interface,
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

import {
  PresaleInterface,
  StakingInterface,
  ReferralInterface,
  TokenInterface,
} from "../contracts";

export const AddressZero = "0x0000000000000000000000000000000000000000";

export const TokenName = "DaoDex Exchange Coin";
export const TokenSymbol = "DaoDex";
export const TokenDecimals = 18;
export const TokenSupply = {
  number: 1000000000,
  string: "1 Billion",
};
export const TokenContractAddress = {
  bscTestnet: "0x18c2214996B49062b98Ad9D091aBCe38a06e882B",
  polygon: "0x9c19247bd66f34e07c05bea8895d5d35dd49f253",
};
export const TokenLogo = tokenLogo;
export const website = window.location.href;
export const userReferralLink = (address: string | undefined) => {
  const webUrl = window.location.host;
  const referralLink = `https://${webUrl}/#/swap/${address}`;
  return referralLink;
};

export const DeepLinks = {
  trustwallet: `https://link.trustwallet.com/open_url?coin_id=966&url=${website}`,
  metamask: `https://metamask.app.link/dapp/${website}`,
  coinbase: `https://go.cb-w.com/dapp?cb_url=${website}`,
};

export const SupportedCoins = ["Native", "USDT"];

export const useSupportedNetworkInfo = {
  [BSCTestnet.chainId]: {
    ["Token"]: {
      ContractAddress: TokenContractAddress?.bscTestnet,
      ContractInterface: new Contract(
        TokenContractAddress?.bscTestnet,
        ERC20Interface
      ),
      Name: TokenName,
      Symbol: TokenSymbol,
      Decimals: TokenDecimals,
      Logo: TokenLogo,
    },
    TokenOwner: "0x7a0DeC713157f4289E112f5B8785C4Ae8B298F7F",
    PresaleContractAddress: "0x1a2d6425D1748c88604Edf7694B5DA6826aE5252",
    PresaleInterface: new Contract(
      "0x1a2d6425D1748c88604Edf7694B5DA6826aE5252",
      PresaleInterface.abi
    ),
    ReferralContractAddress: "0xf6B661f27DA6C90164CD7F1F54fA4a4E3AF9f3f0",
    ReferralInterface: new Contract(
      "0xf6B661f27DA6C90164CD7F1F54fA4a4E3AF9f3f0",
      ReferralInterface?.abi
    ),
    StakingContractAddress: "0xeb77dBf0aB3f3cdA92Ad1b6165BeE88ef75eaE4E",
    StakingInterface: new Contract(
      "0xeb77dBf0aB3f3cdA92Ad1b6165BeE88ef75eaE4E",
      StakingInterface.abi
    ),
    DefaultReferrer: 0x4345492b7bf4967e8ff7b3d0858945560391eab1,
    ["USDT"]: {
      ContractAddress: "0xbfA0e2F4b2676c62885B1033670C71cdefd975fB",
      ContractInterface: new Contract(
        "0xbfA0e2F4b2676c62885B1033670C71cdefd975fB",
        ERC20Interface
      ),
      Name: "Tether USDT",
      Symbol: "USDT",
      Decimals: 6,
      Logo: USDTLogoSVG,
    },
    ["Native"]: {
      ContractAddress: "",
      ContractInterface: "",
      Name: "Binance Smart Chain Testnet",
      Symbol: "tBNB",
      Decimals: 18,
      Logo: BNBLogoSVG,
    },
    Network: BSCTestnet,
    NetworkName: "Binance Smart Chain Testnet",
    NetworkSymbol: "tBNB",
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
      ContractInterface: new Contract(
        TokenContractAddress?.polygon,
        ERC20Interface
      ),
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
    ReferralContractAddress: "0xf6B661f27DA6C90164CD7F1F54fA4a4E3AF9f3f0",
    ReferralInterface: new Contract(
      "0xf6B661f27DA6C90164CD7F1F54fA4a4E3AF9f3f0",
      ReferralInterface?.abi
    ),
    StakingContractAddress: "0xD021F0c34C02Ec2Bf6D80905c23bafad0482d1ea",
    StakingInterface: new Contract(
      "0xD021F0c34C02Ec2Bf6D80905c23bafad0482d1ea",
      StakingInterface.abi
    ),
    DefaultReferrer: "0xb35963e0ab2141cd4ab743e7a35d8772f3cf0447",
    ["USDT"]: {
      ContractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      ContractInterface: new Contract(
        "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        ERC20Interface
      ),
      Name: "Tether USDT",
      Symbol: "USDT",
      Decimals: 6,
      Logo: USDTLogoSVG,
    },
    ["Native"]: {
      ContractAddress: "",
      ContractInterface: "",
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
