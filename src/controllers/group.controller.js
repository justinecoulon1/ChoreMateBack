import express from 'express';
import groupRepository from '../repositories/group.repository.js';
import memberRepository from '../repositories/member.repository.js';
import choresRepository from '../repositories/chores.repository.js';
import { GroupDetailDTO } from '../dto/group.dto.js';
import userRepository from '../repositories/user.repository.js';

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
        const filterDate = req.query?.filter_date ?? false;

        // ! Check only the format of date (no valid month or day)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (filterDate && !dateRegex.test(filterDate)) {
            res.status(400).json({ "error": "Wrong date format. Expected YYYY-MM-DD" })
            return;
        }
        const chores = await choresRepository.getAllInAGroup(group, filterDate);
        res.json(chores);
    },
    delete: async (req, res) => {
        const id = req.group.id;
        await groupRepository.delete(id);
        res.sendStatus(200);
    },
    addNewMember: async (req, res) => {
        const { userId, role } = req.body;
        await memberRepository.addMember(req.group.id, parseInt(userId), role);
        res.sendStatus(200);
    },
    getGroupsByUserId: async (req, res) => {
        const { id } = req.user;
        const groups = await groupRepository.getGroupsByUserId(id)
        res.json(groups);
    }
}

export default groupController;