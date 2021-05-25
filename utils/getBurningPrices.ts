import fetch from "node-fetch";
import { SISHI, BUSD } from "./constants";

const BITQUERYAPIKeys = [
  "BQYx3d2Egi3kjsKEFai2BDkG7fguIVh3",
  "BQYfpFDeD9efWxorWfXUKLsYAbnFAsax",
  "BQYCsnSzDM0oBVaDBArlDo6QjDRs0aLw",
]


export const getBurningPrices = async (times: string[]) => {
  let query = `
    query {
      ethereum(network: bsc) {
        ${times.map((time, index) => `      
        data_${index}: address(address: {is: "0x672e7976558eD2E6C3f99c0CD7C92a9eec01e9FB"}) {
          balances(time: {before: "${time}"}) { currency { symbol, address}, value }
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
      let tokenAmount = balances.find(e => e.currency?.address == SISHI);
      let busdAmount = balances.find(e => e.currency?.address == BUSD);

      return {
        time: times[parseInt(i)],
        index: parseInt(i),
        price: (busdAmount?.value ?? 0) / (tokenAmount?.value ?? 1),
      };
    });
};

const APIKeys = [
  "VT3H3E5FI7RZ84PCKN4K1HWR167SFTQ9QU",
  "ECWXHIT9BHWVD1NAIH64VGYYR3ANFYXBP8",
  "ZK15KXVMF7N9IKNRKRYP12DXTC3D6BDMKZ",
]


export const getBurning = async () => {
  try {

    console.log("Get Burning .....", new Date());

    let topic0 = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
    let topic2 = "0x000000000000000000000000000000000000000000000000000000000000dead"
    let apikey = APIKeys[(Math.random() * APIKeys.length) | 0]

    let { status, message = "", result = [] } = <any>await fetch(
      `https://api.bscscan.com/api?module=logs&action=getLogs&address=${SISHI}&topic0=${topic0}&topic0_2_opr=and&topic2=${topic2}&apikey=${apikey}`
    ).then(e => e.json());

    return { status, message, result };
  } catch (error) {
    throw new Error("Fail to fetch transactions from bscscan.com")
  }
};
