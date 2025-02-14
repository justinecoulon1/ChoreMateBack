import express from 'express'
import userModel from '../model/user.model.js';

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

    getAll: (req, res) => {
        res.json(userModel.getAll());
    },
    getUser: (req, res) => {
        let { id } = req.params;
        id = parseInt(id);
        const user = userModel.getById(id);
        if (!user) {
            res.status(400).json({ error: "User not found!" });
            return;
        }
        res.json(user);
    },
    addUser: (req, res) => {
        let { name } = req.body;
        name = name?.trim();
        if (!name) {
            res.status(400).json({ error: "Must have a name" });
            return;
        }
        const newUser = userModel.addUser(name);
        res.json(newUser);
    }

}

export default userController;