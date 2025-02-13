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

    add: (choreName, choreAssignee, choreDate) => {
        const newChore = {
            id: context.nextId,
            name: choreName,
            assignee: choreAssignee,
            status: 'TODO',
            date: choreDate
        }
        context.chores.push(newChore);
        context.nextId++;
        console.log(context.chores);

        return newChore;
    },

    markAsCompleted: (id) => {
        let chore = choresModel.getById(id);
        if (chore) {
            chore.status = 'DONE';
            return chore;
        }
        return {err: "The chore wasn't found."};
    }

}

export default choresModel;