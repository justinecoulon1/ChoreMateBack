import express from 'express';
import groupRepository from '../repositories/group.repository.js';
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
    getAll: async (req, res) => {
        const groups = await groupRepository.getAll();
        res.json(groups);
    },
    getById: (req, res) => {
        res.json(req.group);
    },
    addGroup: async (req, res) => {
        const { adminGroupId, groupName } = req.body;
        const newGroup = await groupRepository.addGroup(adminGroupId, groupName);
        await memberRepository.addMember(adminGroupId, newGroup.id, "ADMIN");
        res.json(newGroup);
    },
    getAllChoresInAGroup: async (req, res) => {
        const group = req.group;
        const chores = await choresModel.getAllInAGroup(group);

        res.json(chores);
    }
}

export default groupController;