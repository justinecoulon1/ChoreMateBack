import model, { db } from "../model/index.js";

const groupRepository = {
    getAll: async () => {
        return db.models.Group.findAll();
    },
    getById: async (id) => {
        const group = await db.models.Group.findByPk(id, {
            include: [
                {
                    model: db.models.Member,
                    attributes: ['role'],
                    include: [
                        {
                            model: db.models.User,
                            attributes: ['id', 'name'],
                        }
                    ]
                }
            ]
        });
        return group;
    },
    addGroup: async (groupName) => {
        const newGroup = await db.models.Group.create({
            name: groupName,
        });
        return db.models.Group.findByPk(newGroup.id);
    },
    delete: async (groupeId) => {
        await db.models.Group.destroy({
            where: {
                id: groupeId
            }
        });
    }
}

export default groupRepository;