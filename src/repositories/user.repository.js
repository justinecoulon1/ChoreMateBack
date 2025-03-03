import { db } from "../model/index.js";


const userRepository = {

    getAll: async () => {
        return db.models.User.findAll();
    },
    getById: async (id) => {
        return db.models.User.findByPk(id);
    },
    getByEmail: async (email) => {

        const user = db.models.User.findOne({
            where: {
                email: email.toLowerCase(),
            }
        });
        return structuredClone(user);
    },
    addUser: async ({ name, email, password }) => {
        const newUser = {
            name,
            email,
            password
        }
        await db.models.User.create(newUser);
        return newUser;
    },
    updateUser: async (id, name) => {
        const user = await db.models.User.findByPk(id);
        user.set({ name });
        await user.save();
        return user;
    },
    updateNbPoints: async (id, nbPoints) => {
        const user = await db.models.User.findByPk(id);
        user.set({ points: nbPoints });
        await user.save();
        return user;
    },
    delete: async (id) => {
        const user = await db.models.User.findByPk(id);
        await user.destroy();
        // TODO delete the chores related to the users (DB option : CASCADE)
    }


}

export default userRepository;