import express from 'express';
import choreController from '../controllers/chores.controllers.js';
import validateChore from '../middlewares/chores/validateChore.js';

const choresRouter = express.Router();

choresRouter.post('/add', validateChore, choreController.addPOST);

export default choresRouter;