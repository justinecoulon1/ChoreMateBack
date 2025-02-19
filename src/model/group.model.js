import groups from '../../mockup_data/groups.json' with {type: 'json'}

const context = {
    groups: groups,
    nextId: 2
}

const groupModel = {
    getAll: () => {
        return structuredClone(context.groups);
    },
    getById: (id) => {
        const group = context.groups.find(group => group.id === id);
        return group;
    }
}

export default groupModel;