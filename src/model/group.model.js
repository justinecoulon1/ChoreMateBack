import groups from '../../mockup_data/groups.json' with {type: 'json'}

const context = {
    groups: groups,
    nextId: 2
}

const groupModel = {
    getAll: () => {
        return structuredClone(context.groups);
    }
}

export default groupModel;