import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import LunchDayService from '@src/services/LunchDayService';
import { IReq, IRes } from "./types/express/misc";
import { ILunchDay } from '@src/models/LunchDay'

// * Functions *//

// Get lunch Days
async function getLunchDayList(req: IReq, res: IRes) {
    console.log(`Params: ${JSON.stringify(req.params)}`)
    const lunchWeekId = +req.params.lunchWeekId;
    let lunchDayList = await LunchDayService.getLunchDayList(lunchWeekId);
    return res.status(HttpStatusCodes.OK).json({ lunchDayList });
}

// Add
async function add(req: IReq<{lunchDay: ILunchDay}>, res: IRes) {
    const { lunchDay } = req.body;
    const response = await LunchDayService.add(lunchDay);
    console.log(response)
    return res.status(HttpStatusCodes.OK).json(response);
}
// Update

async function update(req: IReq<{lunchDay: ILunchDay}>, res: IRes) {
    const { lunchDay } = req.body;
    await LunchDayService.update(lunchDay);
    return res.status(HttpStatusCodes.OK).end()
}

export default {
    getLunchDayList,
    add,
    update
}