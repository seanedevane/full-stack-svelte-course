import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import User from '@src/models/User';
import UserRoutes from './UserRoutes';
import LunchWeekRoutes from './LunchWeekRoutes'
import LunchDayRoutes from './LunchDayRoutes'


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.isUser]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.isUser]),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);


// Add LunchWeek Router

const lunchWeekRouter = Router();

// Get all lunch weeks
lunchWeekRouter.get(
  Paths.LunchWeek.GetAll,
  LunchWeekRoutes.getAll
);

// Get requested week (default current)
lunchWeekRouter.get(
  Paths.LunchWeek.GetOne,
  LunchWeekRoutes.getOne
);

// add lunch week
lunchWeekRouter.post(
  Paths.LunchWeek.Add,
  LunchWeekRoutes.add
);

// Update lunch week
lunchWeekRouter.put(
  Paths.LunchWeek.Update,
  LunchWeekRoutes.update
);

// Delete lunch week
lunchWeekRouter.delete(
  Paths.LunchWeek.Delete,
  LunchWeekRoutes.delete
);

apiRouter.use(Paths.LunchWeek.Base, lunchWeekRouter)
// Lunch day router

const lunchDayRouter = Router({ mergeParams: true});

// Get lunchDays List

lunchDayRouter.get(
  Paths.LunchDay.List,
  LunchDayRoutes.getLunchDayList
)

// Add lunch day
lunchDayRouter.post(
  Paths.LunchDay.Add,
  LunchDayRoutes.add
)

// update

lunchDayRouter.put(
  Paths.LunchDay.Update,
  LunchDayRoutes.update
);

// Tie router in to apiRouter
apiRouter.use(Paths.LunchDay.Base, lunchDayRouter)

// **** Export default **** //

export default apiRouter;
