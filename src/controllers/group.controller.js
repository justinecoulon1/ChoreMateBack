import express from 'express';
import groupModel from '../model/group.model.js';

/**
 * @callback ExpressCallback
 * @param {express.Request} req
 * @param {express.Response} res
 */
/**
 * User Controller
 * @type {Object<string, ExpressCallback>}
 */
const groupController = {
    getAll: (req, res) => {
        res.json(groupModel.getAll());
    },
    getById: (req, res) => {
        res.json(req.group);
    }
}

export default groupController;