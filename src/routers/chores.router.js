import express from 'express';
import choreController from '../controllers/chores.controllers.js';
import validateChore from '../middlewares/chores/validateChore.js';

const choresRouter = express.Router();

choresRouter.get('/:id', choreController.details);
choresRouter.post('/add', validateChore, choreController.addPOST);
choresRouter.post('/:id/complete', choreController.completePOST);

export default choresRouter;