import chores from '../../mockup_data/chores.json' with { type: 'json' };

const context = {
    chores: chores,
    nextId: 4
}

const choresModel = {

    getById: (id) => {
        const chore = context.chores.find(c => c.id === id);
        return chore;
    },

    add: (choreName, choreAssignee) => {
        const newChore = {
            id: context.nextId,
            name: choreName,
            assignee: choreAssignee,
            status: 'TODO'
        }
        context.chores.push(newChore);
        context.nextId++;
        console.log(context.chores);

        return newChore;
    }

}

export default choresModel;