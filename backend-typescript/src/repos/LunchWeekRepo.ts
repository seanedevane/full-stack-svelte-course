import { ILunchWeek } from "@src/models/LunchWeek";
import orm from './MockOrm';

// ** Functions ** //

// Get all lunch weeks (base route)

async function get(): Promise<ILunchWeek[]> {
    const db = await orm.openDb();
    // return full array of lunchWeek objects
    return db.lunchWeeks;
}

// Get specific lunch week
async function getOne(id: number): Promise<ILunchWeek | null> {
    const db = await orm.openDb();
    for (const week of db.lunchWeeks) {
        if (week.lunchWeekId === id) {
            return week;
        }
    }
}

// Add a lunch week

async function add(lunchWeek: ILunchWeek): Promise<void> {
    const db = await orm.openDb();
    // get next available ID by counting the length + 1
    lunchWeek.lunchWeekId = db.lunchWeeks.length + 1
    db.lunchWeeks.push(lunchWeek);
    return orm.saveDb(db);
}

// Update lunch week
async function update(lunchWeek: ILunchWeek): Promise<void> { // TODO: why does this need to be void?
    const db = await orm.openDb();
    // TODO: this might be easier to accomplish with a .find()?
    for (let i = 0; i < db.lunchWeeks.length; i++) {
        if (db.lunchWeeks[i].lunchWeekId === lunchWeek.lunchWeekId) {
            db.lunchWeeks[i] = lunchWeek;
            return orm.saveDb(db)
        }
    }
}

// Delete one lunch week
async function delete_(id: number): Promise<void> {
    const db = await orm.openDb();
    for (let i = 0; i < db.lunchWeeks.length; i++) {
        db.lunchWeeks.splice(i, 1);
        return orm.saveDb(db);
    }
}

export default {
    get,
    getOne,
    add,
    update,
    delete: delete_
}