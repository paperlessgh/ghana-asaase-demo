// imports
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { mainnet, sepolia, bscTestnet, polygonMumbai } from "wagmi/chains";
import { configureChains, createConfig } from "wagmi";

// configure web3modal
// 1. Get the projectID at https://cloud.walletconnect.com
if (!process.env.WEB3_PROJECT_ID) {
  throw new Error("Missing WEB3_PROJECT_ID env variable");
}
export const projectId = process.env.WEB3_PROJECT_ID;

// 2. Configure wagmi config (change chain to mainnet on production)
// add the right chain(s) based on where your smart contract is deployed
export const supportedChains = [mainnet, polygonMumbai]; 
const { publicClient } = configureChains(supportedChains, [
  w3mProvider({ projectId }),
]);
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains: supportedChains }),
  publicClient,
});

// 3. Configure web3 modal ethereum client
export const ethereumClient = new EthereumClient(wagmiConfig, supportedChains);