import express from 'express'
import usersModel from '../model/users.model.js';

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
        res.json(usersModel.getAll());
    },

}

export default userController;