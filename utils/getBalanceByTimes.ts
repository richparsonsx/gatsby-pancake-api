import fetch from "node-fetch";
import { SISHI, BUSD } from "./constants";

const BITQUERYAPIKeys = [
  "BQYx3d2Egi3kjsKEFai2BDkG7fguIVh3",
  "BQYfpFDeD9efWxorWfXUKLsYAbnFAsax",
  "BQYCsnSzDM0oBVaDBArlDo6QjDRs0aLw",
]


export const getBalanceByTimes = async (address: string, erc20Token: string, times: string[]) => {
  console.log(times)
  let query = `
    query {
      ethereum(network: bsc) {
        ${times.map((time, index) => `      
        data_${index}: address(address: {is: "${address}"}) {
          balances(time: {before: "${time}"}, currency: {is:"${erc20Token}"}){ 
            currency { symbol, address}, 
            value 
          }
        }
      `).join()}
    }
  }`;

  let apikey = BITQUERYAPIKeys[(Math.random() * BITQUERYAPIKeys.length) | 0]

  let body = { query, variables: '{}' };

  let results = await (<any>fetch)("https://graphql.bitquery.io/", {
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
      "X-API-KEY": apikey
    },
    // "referrerPolicy": "strict-origin-when-cross-origin",
    "body": JSON.stringify(body),
    "method": "POST",
    "mode": "cors"
  }).then((e: any) => e.json());

  let { data: { ethereum } } = results;

  return Object.entries(<Record<string, [{ balances: { value: number; currency: { symbol: string; address: string; }; }[]; }]>>ethereum)
    .map(([key, value]) => {
      let balances = value[0].balances;
      let [, i] = key.split("_");
      let tokenAmount = balances?.find(e => e.currency?.address == SISHI);

      return {
        time: times[parseInt(i)],
        index: parseInt(i),
        amount: tokenAmount?.value || 0,
      };
    });
};

const APIKeys = [
  "VT3H3E5FI7RZ84PCKN4K1HWR167SFTQ9QU",
  "ECWXHIT9BHWVD1NAIH64VGYYR3ANFYXBP8",
  "ZK15KXVMF7N9IKNRKRYP12DXTC3D6BDMKZ",
]
