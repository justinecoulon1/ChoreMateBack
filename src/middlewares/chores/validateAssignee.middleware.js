import choresModel from '../../model/chores.model.js';
import userModel from '../../model/user.model.js';

const validateAssigneeMiddleware = (req, res, next) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'Missing chore ID' });
        return;
    }
    if (!req.params.assigneeId) {
        res.status(400).json({ error: 'Missing assignee ID' });
        return;
    }

    const id = parseInt(req.params.id);
    const assigneeId = parseInt(req.params.assigneeId);

    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid chore ID' });
        return;
    }
    if (isNaN(assigneeId)) {
        res.status(400).json({ error: 'Invalid assignee ID' });
        return;
    }

    const chore = choresModel.getById(id);
    if (!chore) {
        res.status(404).json({ error: 'Chore not found' });
        return;
    }

    const user = userModel.getById(assigneeId);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    req.chore = chore;
    req.user = user;
    next();
};

export default validateAssigneeMiddleware;
