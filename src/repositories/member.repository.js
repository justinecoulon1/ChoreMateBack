import { where } from "sequelize";
import { db } from "../model/index.js";

const memberRepository = {

    addMember: async (groupId, userId, role) => {
        const member = {
            role,
            score: 0,
            userId,
            groupId,
        }
        await db.models.Member.create(member);
    },

    getByUserAndGroup: async (userId, groupId) => {
        const member = await db.models.Member.findAll({
            where: {
                userId: userId,
                groupId: groupId
            }
        });
        return member;
    }
}

export default memberRepository;