import express from 'express';
import groupModel from '../repositories/group.repository.js';
import memberRepository from '../repositories/member.repository.js';
import choresModel from '../repositories/chores.repository.js';

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
        memberRepository.addMember(adminGroupId, newGroup.id, "ADMIN");
        res.json(newGroup);
    },
    getAllChoresInAGroup: (req, res) => {
        const group = req.group;
        const chores = choresModel.getAllInAGroup(group);

        res.json(chores);
    }
}

export default groupController;