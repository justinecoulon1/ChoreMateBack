import groups from '../../mockup_data/groups.json' with {type: 'json'}

const context = {
    groups: groups,
    nextId: 3
}

const groupModel = {
    getAll: () => {
        return structuredClone(context.groups);
    },
    getById: (id) => {
        const group = context.groups.find(group => group.id === id);
        return group;
    },
    addGroup: (adminGroupId, groupName) => {
        const newGroup = {
            id: context.nextId,
            admin: adminGroupId,
            name: groupName,
            chores: [] // TODO check this if we shouldn't add another table 
        }
        context.nextId++;
        return newGroup;
    }
}

export default groupModel;