import express from 'express';
import choreController from '../controllers/chores.controllers.js';
import validateAssigneeMiddleware from '../middlewares/chores/validateAssignee.middleware.js';
import validateChoreMiddleware from '../middlewares/chores/validateChore.middleware.js';
import validateDeleteChoreMiddleware from '../middlewares/chores/validateDelete.middelware.js';

const choresRouter = express.Router();

choresRouter.get('/:id', choreController.details);
choresRouter.post('/add', validateChoreMiddleware, choreController.addPost);
choresRouter.put('/:id/complete', choreController.completeChore);
choresRouter.put('/:id/add_assignee/:assigneeId', validateAssigneeMiddleware, choreController.addAssignee);
choresRouter.put('/:id/remove_assignee/:assigneeId', validateAssigneeMiddleware, choreController.removeAssignee);
choresRouter.delete('/:id/deleteChore',validateDeleteChoreMiddleware, choreController.deleteChore);

export default choresRouter;
