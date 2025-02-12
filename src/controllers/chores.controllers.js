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

    addPOST: (req, res) => {
        try {
            const newChore = choresModel.add(req.body.name, req.body.assignee);
            console.log(newChore);
            res.status(201).json(newChore);
        } catch(error) {
            res.status(401).json({ err: error.message });
        }
    }

};

export default choreController;