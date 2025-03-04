import express from 'express';
import choresRepository from '../repositories/chores.repository.js';

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
    details: async (req, res) => {
        const id = parseInt(req.params.id);
        const chore = await choresRepository.getById(id);
        if (chore) {
            res.status(200).json(chore);
            return;
        }
        res.status(404).json({ err: 'Not found' });
    },

    addPost: async (req, res) => {
        try {
            const newChore = await choresRepository.add(req.body.name, req.body.date, req.body.assignee);
            res.status(201).json(newChore);
        } catch (error) {
            res.status(401).json({ err: error.message });
        }
    },

    completeChore: async (req, res) => {
        if (!req.params.id) {
            res.status(400).json({ error: 'Missing chore ID' });
            return;
        }

        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid chore ID' });
            return;
        }

        const chore = await choresRepository.markAsCompleted(id);
        res.status(200).json(chore);
    },

    addAssignee: async (req, res) => {
        const { chore, user } = req;

        // TODO create memberChoreRepo : check if the chore is already assigned (using choreId, userId)
        // TODO instead of getting the user get the member

        // if (chore.assignee.includes(user.id)) {
        //     res.status(400).json({ error: 'User already assigned to this chore' });
        //     return;
        // }
        const memberChore = await choresRepository.addAssignee(chore.id, user.id);

        res.status(200).json(memberChore);
    },

    removeAssignee: async (req, res) => {
        const { chore, user } = req;
        // TODO Same thing here getMember

        // if (!chore.assignee.includes(user.id)) {
        //     res.status(400).json({ error: 'User not assigned to this chore' });
        //     return;
        // }

        await choresRepository.removeAssignee(chore.id, user.id);

        res.status(200).json(chore);
    },

    deleteChore: async (req, res) => {
        const choreId = req.params.id;
        const deleted = await choresRepository.delete(choreId);
        if (!deleted) {
            res.status(200).json("Chore doesn't exist !");
            return;
        }
        res.status(200).json("Chore was successfully deleted.");
    }
};

export default choreController;
