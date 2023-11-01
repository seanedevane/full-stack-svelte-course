import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import LunchWeekService from "@src/services/LunchWeekService";
import { IReq, IRes } from './types/express/misc';
import { ILunchWeek } from "@src/models/LunchWeek";

//* Functions *//

// Get all users

async function get(_: IReq, res: IRes) {
    const lunchWeeks = await LunchWeekService.get();
    return res.status(HttpStatusCodes.OK).json({ lunchWeeks });
}

// Get specific lunch week
async function getOne(req: IReq, res: IRes) {
    const id = +req.params.id;
    const lunchWeek = await LunchWeekService.getOne(id);
    return res.status(HttpStatusCodes.OK).json({ lunchWeek })
}

// Add one lunch week
async function add(req: IReq<{lunchWeek: ILunchWeek}>, res: IRes) {
    const { lunchWeek } = req.body;
    await LunchWeekService.add(lunchWeek);
    return res.status(HttpStatusCodes.CREATED).end();
}

// Update one lunch week
async function update(req: IReq<{lunchWeek: ILunchWeek}>, res: IRes) {
    const { lunchWeek } = req.body;
    await LunchWeekService.update(lunchWeek)
    return res.status(HttpStatusCodes.OK).end()
}

// Delete one lunch week
async function delete_(req: IReq, res: IRes) {
    const id = +req.params.id
    await LunchWeekService.delete(id)
    return res.status(HttpStatusCodes.OK).end();
}

export default {
    get,
    getOne,
    update,
    delete: delete_
}