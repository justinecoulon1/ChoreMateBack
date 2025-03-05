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

    getByUserId: async (userId) => {
        await db.models.findAll({
            where: {
                userId: userId
            }
        });
    }
}

export default memberRepository;