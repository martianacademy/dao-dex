import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import {
  BSCTestnet,
  CoinbaseWalletConnector,
  Config,
  DAppProvider,
  Polygon,
} from "@usedapp/core";
import { WalletConnectConnector } from "@usedapp/wallet-connect-connector";
import { getDefaultProvider } from "ethers";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import {
  AnalyticsDashboard,
  Dashboard,
  Home,
  Stake,
  StakingDashboard,
  Swap,
  TeamDashboard,
  TransactionsDashboard,
  User,
} from "./pages";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

const dappConfig: Config = {
  notifications: {
    expirationPeriod: 5000,
  },
  readOnlyChainId: BSCTestnet?.chainId,
  readOnlyUrls: {
    [BSCTestnet?.chainId]: getDefaultProvider(
      "https://bsc-testnet.public.blastapi.io"
    ),
    [Polygon.chainId]: "https://polygon-rpc.com",
  },
  networks: [BSCTestnet, Polygon],
  connectors: {
    walletConnect: new WalletConnectConnector({
      rpc: {
        97: "https://bsc-testnet.public.blastapi.io",
        [Polygon.chainId]: "https://polygon-rpc.com",
      },
      qrcodeModalOptions: {
        desktopLinks: [
          "metamask",
          "ledger",
          "tokenary",
          "wallet",
          "wallet 3",
          "secuX",
          "ambire",
          "wallet3",
          "apolloX",
          "zerion",
          "sequence",
          "punkWallet",
          "kryptoGO",
          "nft",
          "riceWallet",
          "vision",
          "keyring",
        ],
        mobileLinks: ["metamask", "trust"],
      },
    }),
  },
  refresh: "everyBlock",
};

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "swap",
        element: <Swap />,
      },
      {
        path: "swap/:referrerAddress",
        element: <Swap />,
      },
      {
        path: "stake",
        element: <Stake />,
      },
      {
        path: "stake/:stakingInputs",
        element: <Stake />,
      },
      {
        path: "user",
        element: <User />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "analytics-dashboard",
            element: <AnalyticsDashboard />,
          },
          {
            path: "staking-dashboard",
            element: <StakingDashboard />,
          },
          {
            path: "team-dashboard",
            element: <TeamDashboard />,
          },
          {
            path: "transactions-dashboard",
            element: <TransactionsDashboard />,
          },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <DAppProvider config={dappConfig}>
      <ColorModeScript initialColorMode="dark" />
      <ChakraProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ChakraProvider>
    </DAppProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
