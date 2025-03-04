import { db } from "../model/index.js";
import memberRepository from "./member.repository.js";

const groupRepository = {
    getAll: async () => {
        return db.models.Group.findAll();
    },
    getById: async (id) => {
        const group = await db.models.Group.findByPk(id);
        return group;
    },
    addGroup: async (adminGroupId, groupName) => {
        const newGroup = await db.models.Group.create({
            name: groupName,
        });

        await memberRepository.addMember(newGroup.id, adminGroupId, "ADMIN");

        return db.models.Group.findByPk(newGroup.id);
    }
}

export default groupRepository;