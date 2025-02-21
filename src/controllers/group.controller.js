import express from 'express';
import groupModel from '../model/group.model.js';
import memberModel from '../model/member.model.js';

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
    },
    addGroup: (req, res) => {
        const { adminGroupId, groupName } = req.body;
        const newGroup = groupModel.addGroup(adminGroupId, groupName);
        memberModel.addMember(adminGroupId, newGroup.id, "ADMIN");
        res.json(newGroup);
    }
}

export default groupController;