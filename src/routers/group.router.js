import express from 'express'
import groupController from '../controllers/group.controller.js';
import validateGroupMiddleWare from '../middlewares/groups/validateGroup.middleware.js';


const groupRouter = express.Router();

groupRouter.get('/', groupController.getAll);
groupRouter.get('/:id', validateGroupMiddleWare, groupController.getById);

export default groupRouter;