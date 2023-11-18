/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  LunchWeek: {
    Base: '/lunch-week',
    GetAll: '/all',
    GetOne: '/:id',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  LunchDay: {
    Base: '/lunch-week/:lunchWeekId/lunch-day',
    List: '/list',
    Add: '/add',
    Update: '/update'
  }
} as const;
