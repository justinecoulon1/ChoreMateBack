import express from 'express'
import choresModel from '../model/chores.model.js';

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
            res.status(200).json(chore)
            return;
        };
        res.status(404).json({err: "Not found"});
    },

    addPOST: (req, res) => {
        try {
            const newChore = choresModel.add(req.body.name, req.body.assignee);
            console.log(newChore);
            res.status(201).json(newChore);
        } catch(error) {
            res.status(401).json({ err: error.message });
        }
    },

    completePOST: (req, res) => {
        const id = parseInt(req.params.id);
        const chore = choresModel.markAsCompleted(id);
        res.status(200).json(chore);
    }

};

export default choreController;