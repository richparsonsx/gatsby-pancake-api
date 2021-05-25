import { NowRequest, NowResponse } from "@vercel/node";
import { getBurning, getBurningPrices } from "../utils/getBurningPrices";



export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  try {
    let { status, message = "", result = [] } = await getBurning()

    result = result.slice(-100)

    let timestamps = result
      .map((e: any) => parseInt(e.timeStamp, 16))
      .map((e: number) => new Date(e * 1000).toISOString().replace("Z", ""))

    // console.table(timestamps)

    let prices = await getBurningPrices(timestamps)
    let priceByIndex = Object.fromEntries(prices.map(e => ([e.index, e.price])))
    let burningResults = result
      .map((e: any, index: number) => ({
        // ...e,
        blockNumber: parseInt(e.blockNumber, 16),
        address: '0x' + String(e.topics?.[1] || "").slice(-40),
        transactionHash: e.transactionHash,
        timestamps: parseInt(e.timeStamp, 16) * 1000,
        amount: parseInt(e.data, 16) / (10 ** 18),
        price: priceByIndex[index]
      }))

    res.json({ status, message, result: burningResults });
  } catch (error) {
    res.status(400).send({ estatus: "-1", message: String(error) });
    // .json({ status: "-1", message: String(error), });
  }
};
