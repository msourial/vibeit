import * as chains from "viem/chains";

// Define XDC mainnet chain
const xdcMainnet = {
  id: 50,
  name: "XDC Network",
  nativeCurrency: { name: "XDC", symbol: "XDC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://erpc.xinfin.network"] },
    public: { http: ["https://erpc.xinfin.network"] },
  },
  blockExplorers: {
    default: {
      name: "XDC Explorer",
      url: "https://explorer.xinfin.network",
    },
  },
  testnet: false,
} as const;

// Define XDC testnet chain
const xdcTestnet = {
  id: 51,
  name: "XDC Apothem Network",
  nativeCurrency: { name: "XDC", symbol: "TXDC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://erpc.apothem.network"] },
    public: { http: ["https://erpc.apothem.network"] },
  },
  blockExplorers: {
    default: {
      name: "XDC Explorer",
      url: "https://explorer.apothem.network",
    },
  },
  testnet: true,
} as const;

export type BaseConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  rpcOverrides?: Record<number, string>;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

export type ScaffoldConfig = BaseConfig;

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const scaffoldConfig = {
  // The networks on which your DApp is live
  targetNetworks: [xdcTestnet],
  // The interval at which your front-end polls the RPC servers for new data (it has no effect if you only target the local network (default is 4000))
  pollingInterval: 30000,
  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,
  // If you want to use a different RPC for a specific network, you can add it here.
  // The key is the chain ID, and the value is the HTTP RPC URL
  rpcOverrides: {
    // Example:
    // [chains.mainnet.id]: "https://mainnet.buidlguidl.com",
  },
  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",
  onlyLocalBurnerWallet: false,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
