import express from 'express';
import choresModel from '../model/chores.model.js';
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
const choreController = {
    details: (req, res) => {
        const id = parseInt(req.params.id);
        const chore = choresModel.getById(id);
        if (chore) {
            res.status(200).json(chore);
            return;
        }
        res.status(404).json({ err: 'Not found' });
    },

    addPost: (req, res) => {
        try {
            const newChore = choresModel.add(req.body.name, req.body.assignee, req.body.date);
            console.log(newChore);
            res.status(201).json(newChore);
        } catch (error) {
            res.status(401).json({ err: error.message });
        }
    },

    completePost: (req, res) => {
        const id = parseInt(req.params.id);
        const chore = choresModel.markAsCompleted(id);
        res.status(200).json(chore);
    },

    addAssignee: (req, res) => {
        const { chore, user } = req;

        if (chore.assignee.includes(user.id)) {
            res.status(400).json({ error: 'User already assigned to this chore' });
            return;
        }

        chore.assignee.push(user.id);

        res.status(200).json(chore);
    },

    removeAssignee: (req, res) => {
        const { chore, user } = req;

        if (!chore.assignee.includes(user.id)) {
            res.status(400).json({ error: 'User not assigned to this chore' });
            return;
        }

        chore.assignee = chore.assignee.filter((userId) => userId !== user.id);

        res.status(200).json(chore);
    },
};

export default choreController;
