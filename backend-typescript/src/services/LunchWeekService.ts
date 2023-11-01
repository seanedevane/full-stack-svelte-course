import LunchWeekRepo from "@src/repos/LunchWeekRepo";
import { ILunchWeek } from "@src/models/LunchWeek";
import { RouteError } from "@src/other/classes";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

// ** Variables ** //

export const LUNCH_WEEK_NOT_FOUND_ERR = 'Lunch week not found';

// ** Functions ** //

// Get all lunch weeks (base route)
function getAll(): Promise<ILunchWeek[]> {
    return LunchWeekRepo.getAll();
}

// Get one lunch week
function getOne(id: number): Promise<ILunchWeek | null> {
    return LunchWeekRepo.getOne(id);
}

// Add a lunch week
function add(lunchWeek: ILunchWeek): Promise<void> {
    return LunchWeekRepo.add(lunchWeek);
}

// Update a lunch week
function update(lunchWeek: ILunchWeek): Promise<void> {
    return LunchWeekRepo.update(lunchWeek);
}

// Delete one lunch week

function _delete(id: number): Promise<void> {
    return LunchWeekRepo.delete(id);
}

// ** Export default **//

export default {
    getAll,
    getOne,
    add,
    update,
    delete: _delete
} as const;