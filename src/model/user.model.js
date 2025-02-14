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
    }

}

export default userModel;