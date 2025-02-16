import userModel from '../../model/user.model.js';

const validateUserMiddleware = (req, res, next) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'Missing user ID' });
        return;
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
    }

    const user = userModel.getById(id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    req.user = user;
    next();
};

export default validateUserMiddleware;
