import members from '../../mockup_data/members.json' with {type: 'json'}

const context = {
    members: members,
    nextId: 4
}

const memberModel = {

    addMember: (adminGroupId, groupeId, role) => {
        const newMember = {
            "id": context.nextId,
            "groupe_id": groupeId,
            "user_id": adminGroupId,
            role: role,
            nb_points: 0
        }
        context.members.push(newMember)
        context.nextId++;
        console.log(context.members);
    }
}

export default memberModel;