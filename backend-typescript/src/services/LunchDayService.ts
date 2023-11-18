import LunchDayRepo from '@src/repos/LunchDayRepo';
import { ILunchDay } from '@src/models/LunchDay';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

//* Variables **//

export const LUNCH_DAY_NOT_FOUND_ERR = 'Lunch day not found';

// * Functions *//

// Get lunch Day list for a specific week
function getLunchDayList(lunchWeekId: number): Promise<ILunchDay[] | null> {
    return LunchDayRepo.getLunchDayList(lunchWeekId)
}

// Add lunch day
function add(lunchDay: ILunchDay): Promise<void> {
    return LunchDayRepo.add(lunchDay)
}

// Update lunch day
function update(lunchDay: ILunchDay): Promise<void> {
    return LunchDayRepo.update(lunchDay)
}

export default {
    getLunchDayList,
    add,
    update
} as const;