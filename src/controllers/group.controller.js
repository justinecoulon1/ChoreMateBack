import express from 'express';
import groupRepository from '../repositories/group.repository.js';
import memberRepository from '../repositories/member.repository.js';
import choresRepository from '../repositories/chores.repository.js';
import { GroupDetailDTO } from '../../dto/group.dto.js';

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
        res.json(new GroupDetailDTO(req.group));
    },
    addGroup: async (req, res) => {
        const { adminGroupId, groupName } = req.body;
        const newGroup = await groupRepository.addGroup(groupName);
        await memberRepository.addMember(newGroup.id, adminGroupId, "ADMIN");
        res.json(newGroup);
    },
    getAllChoresInAGroup: async (req, res) => {
        const group = req.group;
        const chores = await choresRepository.getAllInAGroup(group);
        res.json(chores);
    },
    delete: async (req, res) => {
        const id = req.group.id;
        await groupRepository.delete(id);
        res.sendStatus(200);
    },
    addNewMember: async (req, res) => {
        //TODO Check if member is already in group
        const { userId, role } = req.body;
        await memberRepository.addMember(req.group.id, parseInt(userId), role);
        res.json(200);
    }
}

export default groupController;