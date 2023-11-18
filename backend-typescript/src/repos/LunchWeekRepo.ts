import { ILunchWeek } from "@src/models/LunchWeek";
import orm from './MockOrm';
import db from 'database/client';

// ** Functions ** //

// Get all lunch weeks (base route)

// async function getAll(): Promise<ILunchWeek[]> {
//     const db = await orm.openDb();
//     // return full array of lunchWeek objects
//     return db.lunchWeeks;
// }


async function getAll(): Promise<ILunchWeek[]> {
    return db.select().from('lunch_week').orderBy('week_of')
    // 
}

// Get specific lunch week
// async function getOne(id: number): Promise<ILunchWeek | null> {
    //     const db = await orm.openDb();
    //     for (const week of db.lunchWeeks) {
        //         if (week.lunchWeekId === id) {
            //             return week;
            //         }
            //     }
            //     return null;
            // }


async function getOne(id: number): Promise<ILunchWeek | null> {
    return db.select().from('lunch_week').where('lunch_week_id', id).first()
    // TODO: figure out the best way to append the below request into a useable response
    // db.select().from('lunch_day').where('lunch_week_id', id')
}
// Add a lunch week

// async function add(lunchWeek: ILunchWeek): Promise<void> {
//     const db = await orm.openDb();
//     // get next available ID by counting the length + 1
//     lunchWeek.lunchWeekId = db.lunchWeeks.length + 1
//     db.lunchWeeks.push(lunchWeek);
//     return orm.saveDb(db);
// }

async function add(lunchWeek: ILunchWeek): Promise<void> {
    return db('lunch_week').insert(lunchWeek).returning('lunch_week_id')
}

// // Update lunch week
// async function update(lunchWeek: ILunchWeek): Promise<void> { // TODO: why does this need to be void?
//     const db = await orm.openDb();
//     // TODO: this might be easier to accomplish with a .find()?
//     for (let i = 0; i < db.lunchWeeks.length; i++) {
//         if (db.lunchWeeks[i].lunchWeekId === lunchWeek.lunchWeekId) {
//             db.lunchWeeks[i] = lunchWeek;
//             return orm.saveDb(db)
//         }
//     }
// }

async function update(lunchWeek: ILunchWeek): Promise<void> {
    return db('lunch_week').where('lunch_week_id', lunchWeek.lunchWeekId).update(lunchWeek)
}

// Delete one lunch week
// async function delete_(id: number): Promise<void> {
//     const db = await orm.openDb();
//     for (let i = 0; i < db.lunchWeeks.length; i++) {
//         db.lunchWeeks.splice(i, 1);
//         return orm.saveDb(db);
//     }
// }
async function delete_(id: number): Promise<void> {
    return db('lunch_week').where('lunch_week_id', id).del()
}



export default {
    getAll,
    getOne,
    add,
    update,
    delete: delete_
}