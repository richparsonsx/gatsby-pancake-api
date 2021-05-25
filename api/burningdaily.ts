import { NowRequest, NowResponse } from "@vercel/node";
import { DEAD, SISHI } from "../utils/constants";
import { getBalanceByTimes } from "../utils/getBalanceByTimes";



export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  try {
    let dayTimestamp = 3600000 * 24
    let startDay = Date.parse('3/28/2021, 7:00:00 AM GMT+7')
    let currentDay = Date.now()
    let dayCount = 2 + ((currentDay - startDay) / dayTimestamp | 0)
    let dayArrays = new Array(dayCount).fill(0)
      .map((e, i) => startDay + dayTimestamp * i)
      .map((e: number) => new Date(e).toISOString().replace("Z", ""))

    let balanceByTimes = await getBalanceByTimes(DEAD, SISHI, dayArrays)

    let burningByTimes = balanceByTimes.slice(1)
      .map((e, i) => ({
        ...balanceByTimes[i],
        totalBurned: e.amount,
        amount: e.amount - balanceByTimes[i].amount
      }))

    res.json({ status: "ok", message: "", result: burningByTimes });

  } catch (error) {
    res.status(400).send({ estatus: "-1", message: String(error) });
    // .json({ status: "-1", message: String(error), });
  }
};
