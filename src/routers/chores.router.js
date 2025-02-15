import express from 'express';
import choreController from '../controllers/chores.controllers.js';
import validateChoreMiddleware from '../middlewares/chores/validateChore.middleware.js';
import validateAssigneeMiddleware from '../middlewares/chores/validateAssignee.middleware.js';

const choresRouter = express.Router();

choresRouter.get('/:id', choreController.details);
choresRouter.post('/add', validateChoreMiddleware, choreController.addPost);
choresRouter.post('/:id/complete', choreController.completePost);
choresRouter.post('/:id/add_assignee/:assigneeId', validateAssigneeMiddleware, choreController.addAssignee);
choresRouter.post('/:id/remove_assignee/:assigneeId', validateAssigneeMiddleware, choreController.removeAssignee);

export default choresRouter;
