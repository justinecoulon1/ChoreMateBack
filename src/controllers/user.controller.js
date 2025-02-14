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
            res.status(404).json({ error: "User not found!" });
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
    },
    updateUser: (req, res) => {
        const id = parseInt(req.params.id);
        const user = userModel.getById(id);
        if (!user) {
            res.status(404).json({ error: "User not found!" });
            return;
        }
        let { name } = req.body;
        name = name?.trim();
        console.log("hey", name);
        if (!name) {
            res.status(400).json({ error: "Invalid name !" });
            return;
        }
        const updatedUser = userModel.updateUser(id, name);
        res.json(updatedUser);
    },
    updateNbPoints: (req, res) => {
        const id = parseInt(req.params.id);
        const user = userModel.getById(id);
        if (!user) {
            res.status(404).json({ error: "User not found!" });
            return;
        }
        let { nbPoints } = req.body;
        if (isNaN(nbPoints)) {
            res.status(400).json({ error: "Invalid number of points!" });
            return;
        }
        nbPoints = parseInt(nbPoints);
        const updatedUser = userModel.updateNbPoints(id, nbPoints);
        res.json(updatedUser);
    },
    deleteUser: (req, res) => {
        const id = parseInt(req.params.id);
        const user = userModel.getById(id);
        if (!user) {
            res.status(404).json({ error: "User not found!" });
            return;
        }
        userModel.delete(id);
        res.json("User deleted!")
    }
}

export default userController;