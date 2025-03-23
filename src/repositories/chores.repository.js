import { db } from "../model/index.js";

const choresRepository = {

    getById: async (id) => {
        const chore = await db.models.Chore.findByPk(id);
        return chore;
    },

    getAllInAGroup: async (group, filterDate) => {
        const filter = { groupId: group.id }
        if (filterDate) {
            filter.dueDate = filterDate;
        }
        
        const chores = await db.models.Chore.findAll({
            where: filter
        });

        return chores;
    },
    add: async (choreName, choreDate, _userId) => {
        // ? by default assign to no one
        // Todo assign directly to a user : call addAssignee

        const newChore = {
            name: choreName,
            status: 'TODO',
            dueDate: choreDate
        }

        return db.models.Chore.create(newChore);
    },

    markAsCompleted: async (id) => {
        let chore = await db.models.Chore.findByPk(id);
        if (!chore) {
            return { err: "The chore wasn't found." };
        }
        chore.set({ status: "DONE" });
        await chore.save();
        return chore;
    },

    addAssignee: async (choreId, memberId) => {
        const memberChore = await db.models.MemberChore.create({ memberId, choreId })
        return memberChore;
    },
    removeAssignee: async (choreId, memberId) => {
        await db.MemberChore.destroy({
            where: { memberId, choreId }
        });

        //! If no other assignments to chore ? should we remove the chore  
        const assignementLeft = await db.models.MemberChore.count({ where: { choreId } })
        if (assignementLeft === 0) {
            await db.models.Chore.destroy({ where: { id: choreId } })
        }

    },
    checkChoreAssignedToMember: async (userId, choreId) => {
        const memberChore = await db.models.MemberChore.findOne({ where: { userId, choreId } });
        if (!memberChore) {
            return false
        }
        return true;
    },
    delete: async (choreId) => {
        const chore = await db.models.Chore.findByPk(choreId);
        if (!chore) return false
        return true;
    }

}

export default choresRepository;