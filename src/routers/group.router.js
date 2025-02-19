import express from 'express'
import groupController from '../controllers/group.controller.js';


const groupRouter = express.Router();

groupRouter.get('/', groupController.getAll);

export default groupRouter;