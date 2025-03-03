import { db } from "../model/index.js";

const groupRepository = {
    getAll: async () => {
        return db.models.Group.findAll();
    },
    getById: async (id) => {
        const group = await db.models.Group.findByPk(id);
        return group;
    },
    addGroup: async (adminGroupId, groupName) => {
        const newGroup = {
            admin: adminGroupId,
            name: groupName,
        }

        return db.models.Group.create(newGroup);
    }
}

export default groupRepository;