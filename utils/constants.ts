import { ChainId, Token } from "@pancakeswap-libs/sdk";

// BEP-20 addresses.
export const SISHI = "0x8e8538c75f273ab2df6adeecd3622a9c314fccf3";
export const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
export const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const DEAD = "0x000000000000000000000000000000000000dead";

// Contract addresses.
export const SISHI_BNB_FARM = "0xD5F575fCFaE274B4fC65069B3c7E43212812F7E6";
export const MASTERCHEF_CONTRACT = "0x2D9d427962EDACF5207a727c41Ce5Cb90C449F4b";
export const LOTTERY_CONTRACT = "";
// export const LOTTERY_CONTRACT = "0x3C3f2049cc17C136a604bE23cF7E42745edf3b91";
export const MULTICALL_CONTRACT = "0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb";

// PancakeSwap SDK Token.
export const SISHI_TOKEN = new Token(ChainId.MAINNET, SISHI, 18);
export const WBNB_TOKEN = new Token(ChainId.MAINNET, WBNB, 18);
export const SISHI_BNB_TOKEN = new Token(ChainId.MAINNET, SISHI_BNB_FARM, 18);
