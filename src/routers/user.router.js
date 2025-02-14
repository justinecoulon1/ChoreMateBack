import express from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getUser);
userRouter.post('/register', userController.addUser);
userRouter.put('/:id', userController.updateUser);
userRouter.put('/:id/nb_points', userController.updateNbPoints);
// userRouter.delete('/:id', userController.deleteUser);

export default userRouter;