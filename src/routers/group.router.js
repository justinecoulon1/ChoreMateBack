import express from 'express'
import groupController from '../controllers/group.controller.js';
import validateGroupMiddleWare from '../middlewares/groups/validateGroup.middleware.js';
import validateCreateGroupMiddleWare from '../middlewares/groups/validateCreateGroup.middleware.js';


const groupRouter = express.Router();

groupRouter.route('/')
    .get(groupController.getAll)
    .post(validateCreateGroupMiddleWare, groupController.addGroup);
groupRouter.get('/:id', validateGroupMiddleWare, groupController.getById);
groupRouter.get('/:id/chores', validateGroupMiddleWare, groupController.getAllChoresInAGroup);

export default groupRouter;