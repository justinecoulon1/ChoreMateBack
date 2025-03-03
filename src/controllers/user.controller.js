import express from 'express';
import userRepository from '../repositories/user.repository.js';

/**
 * @callback ExpressCallback
 * @param {express.Request} req
 * @param {express.Response} res
 */
/**
 * User Controller
 * @type {Object<string, ExpressCallback>}
 */
const userController = {
    getAll: async (req, res) => {
        const users = await userRepository.getAll();
        res.json(users);
    },
    getUser: (req, res) => {
        res.json(req.user);
    },
    addUser: async (req, res) => {
        let { name, password, email } = req.body;
        name = name?.trim();
        // TODO More validation here : (ZOD ? )
        if (!name) {
            res.status(400).json({ error: 'Must have a name' });
            return;
        }
        const newUser = await userRepository.addUser({ name, email, password });
        res.json(newUser);
    },
    updateUser: async (req, res) => {
        const id = req.user.id;

        let { name } = req.body;
        name = name?.trim();

        if (!name) {
            res.status(400).json({ error: 'Invalid name!' });
            return;
        }

        const updatedUser = await userRepository.updateUser(id, name);
        res.json(updatedUser);
    },
    deleteUser: async (req, res) => {
        const id = req.user.id;

        await userRepository.delete(id);
        res.json('User deleted!');
    },
};

export default userController;
