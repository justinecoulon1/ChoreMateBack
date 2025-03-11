export class GroupDetailDTO {
    constructor({id, name, members}) {
        this.id = id;
        this.name = name;
        this.members = members.map(m => ({
            userId: m.user.id,
            userName: m.user.name,
            role: m.role
        }));
    }
}