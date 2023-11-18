import { ILunchDay } from "./LunchDay";


// ** Variables **// 


const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must be a string or an ' + 'object with the appropriate user keys.';

// ** Types **//

export interface ILunchWeek {
    lunchWeekId: number;
    weekOf: string;
    isPublished: boolean;
    lunchDays: Array<ILunchDay>;
}

// ** Functions **// 

// TODO: unclear if needed yet.