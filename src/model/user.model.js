import initialUsers from '../../mockup_data/users.json' with { type: 'json' };

const context = {
    users: initialUsers,
    nextId: 3
}

const userModel = {

    getAll: () => {
        return structuredClone(context.users);
    },
    getById: (id) => {
        const user = context.users.find(user => user.id === id);
        return structuredClone(user);
    },
    addUser: (name) => {
        const newUser = {
            id: context.nextId,
            name: name,
            nb_points: 0,
        }
        context.users.push(newUser);
        context.nextId++;
        return newUser;
    },
    updateUser: (id, name) => {
        const user = context.users.find(user => user.id === id);
        user.name = name;
        return structuredClone(user);
    },
    updateNbPoints: (id, nbPoints) => {
        const user = context.users.find(user => user.id === id);
        user.nb_points = nbPoints;
        return structuredClone(user);
    },
    delete(id) {
        context.users = context.users.filter(user => user.id !== id);
        // TODO delete the chores related to the users (DB option : CASCADE)
    }


}

export default userModel;