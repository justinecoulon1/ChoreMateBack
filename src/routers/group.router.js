import express from 'express'
import validateGroupMiddleWare from '../middlewares/groups/validateGroup.middleware.js';
import validateCreateGroupMiddleWare from '../middlewares/groups/validateCreateGroup.middleware.js';
import validateNewMemberMiddleWare from '../middlewares/groups/validateNewMember.middleware.js';
import groupController from '../controllers/group.controller.js';
import validateUserMiddleware from '../middlewares/users/validateUser.middleware.js';


const groupRouter = express.Router();

groupRouter.route('/')
    .get(groupController.getAll)
    .post(validateCreateGroupMiddleWare, groupController.addGroup);
groupRouter.route('/:id')
    .get(validateGroupMiddleWare, groupController.getById)
    .delete(validateGroupMiddleWare, groupController.delete)
    .post(validateGroupMiddleWare, validateNewMemberMiddleWare, groupController.addNewMember)
groupRouter.get("/:id/chores", validateGroupMiddleWare, groupController.getAllChoresInAGroup)
groupRouter.get('/user/:id', validateUserMiddleware, groupController.getGroupsByUserId);

export default groupRouter;