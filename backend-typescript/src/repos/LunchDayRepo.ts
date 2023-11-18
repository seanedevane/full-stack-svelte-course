import { ILunchDay } from '@src/models/LunchDay';
import db from 'database/client';

// * Functions *//

// Get lunch day list for specific week
async function getLunchDayList(lunchWeekId: number): Promise<ILunchDay[] | null> {
    return db.select().from('lunch_day').where('lunch_week_id', lunchWeekId)
}


// add
async function add(lunchDay: ILunchDay): Promise<void> {
    return db('lunch_day').insert(lunchDay).returning('lunch_day_id')
}

// update

async function update(lunchDay: ILunchDay): Promise<void> {
    return db('lunch_day').where('lunch_day_id', lunchDay.lunchDayId).update(lunchDay)
}

export default {
    getLunchDayList,
    add,
    update
}