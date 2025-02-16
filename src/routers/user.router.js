import express from 'express';
import userController from '../controllers/user.controller.js';
import validateUserMiddleware from '../middlewares/users/validateUser.middleware.js';

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', validateUserMiddleware, userController.getUser);
userRouter.post('/register', userController.addUser);
userRouter.put('/:id', validateUserMiddleware, userController.updateUser);
userRouter.put('/:id/nb_points', validateUserMiddleware, userController.updateNbPoints);
userRouter.delete('/:id', validateUserMiddleware, userController.deleteUser);

export default userRouter;
