// ** Variables **//

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must be a string or an ' + 'object with the appropriate user keys.';

// ** Types **//

export interface ILunchDay {
    lunchDayId: number;
    day: Date;
    menuDetails: string;
}