import initialUsers from '../../mockup_data/users.json' with { type: 'json' };

const context = {
    users: initialUsers,
    nextId: 3
}

const usersModel = {

    getAll: () => {
        return structuredClone(context.users);
    }
}

export default usersModel;