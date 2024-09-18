"use client"
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet,polygonAmoy,sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import { type Chain } from 'viem'

export const crossFiTestnet = {
  id: 4157,
  name: 'CrossFi Testnet',
  nativeCurrency: { name: 'XFI', symbol: 'XFI', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.ms'] },
  },
  blockExplorers: {
    default: { name: 'XFIscan', url: 'https://test.xfiscan.com/' },
  },
} as const satisfies Chain

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet,polygonAmoy,sepolia,crossFiTestnet],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(),
      [polygonAmoy.id]:http(),
      [sepolia.id]:http(),
      [crossFiTestnet.id]:http(),
    },

    // Required API Keys
    walletConnectProjectId: "cfb5584e4dc0124bfc0d977e56f9c6d1",

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }:{children:React.ReactNode}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};