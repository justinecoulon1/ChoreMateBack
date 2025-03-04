import { db } from "../model/index.js";

const choresRepository = {

    getById: async (id) => {
        const chore = await db.models.Chore.findByPk(id);
        return chore;
    },

    getAllInAGroup: async (group) => {

        const chores = await db.models.Chore.findAll({
            where: {
                groupeId: group.id,
            }
        });

        return chores;
    },

    add: async (choreName, choreDate) => {
        //! by default assign to no one
        const newChore = {
            name: choreName,
            status: 'TODO',
            date: choreDate
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

    addAssignee: async (choreId, userId) => {
        await db.models.MemberChore.create({ userId, choreId })
        const chore = await db.models.Chore.findByPk(choreId);

        return chore;
    },
    removeAssignee: async (choreId, userId) => {

        await db.Chore.destroy().where({ id: choreId });

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
        if (!chore) throw new Error("Chore not found!")
    }




}

export default choresRepository;