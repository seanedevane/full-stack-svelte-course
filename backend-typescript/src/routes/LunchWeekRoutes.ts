import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import LunchWeekService from "@src/services/LunchWeekService";
import { IReq, IRes } from './types/express/misc';
import { ILunchWeek } from "@src/models/LunchWeek";
import LunchDayService from "@src/services/LunchDayService";

//* Functions *//

// Get all users


// TODO: add error handling for all of these routes to follow https://www.newline.co/courses/fullstack-svelte/adding-post-put-and-delete-endpoints
async function getAll(_: IReq, res: IRes) {
    const lunchWeeks = await LunchWeekService.getAll();
    // consider mapping out lunch_day requests here for each matching id
    return res.status(HttpStatusCodes.OK).json({ lunchWeeks });
}

// Get specific lunch week
async function getOne(req: IReq, res: IRes) {
    const id = +req.params.id;
    let lunchWeek = await LunchWeekService.getOne(id);
    const lunchDayList = await LunchDayService.getLunchDayList(id);
    if (lunchWeek && lunchDayList) {
        lunchWeek.lunchDays = lunchDayList;
    }
    // possibly call a lunch_day request here too and combine the objects
    return res.status(HttpStatusCodes.OK).json({ lunchWeek })
}

// Add one lunch week
async function add(req: IReq<{lunchWeek: ILunchWeek}>, res: IRes) {
    const { lunchWeek } = req.body;
    console.log(lunchWeek)
    const response = await LunchWeekService.add(lunchWeek);
    console.log(response)
    return res.status(HttpStatusCodes.CREATED).json(response);
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
    getAll,
    getOne,
    add,
    update,
    delete: delete_
}