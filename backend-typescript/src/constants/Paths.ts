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
    GetOne: '/:id',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id'
  }
} as const;
