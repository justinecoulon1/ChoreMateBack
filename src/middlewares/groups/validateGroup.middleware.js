import groupModel from "../../repositories/group.repository.js";

const validateGroupMiddleWare = (req, res, next) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'No group id' });
        return;
    }
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid group id' });
        return;
    }
    const group = groupModel.getById(id);
    if (!group) {
        res.status(404).json({ error: 'Group not found' });
        return;
    }
    req.group = group;
    next();
}

export default validateGroupMiddleWare;