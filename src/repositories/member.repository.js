import { db } from "../model/index.js";

const memberRepository = {

    addMember: async (groupId, userId, role) => {    
        const member = {
            groupId,
            userId,
            role,
            nb_points: 0
        }
        return db.models.Member.create(member);
    }
}

export default memberRepository;