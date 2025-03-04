import userRepository from '../../repositories/user.repository.js';

const validateUserMiddleware = async (req, res, next) => {
    if (!req.params.id) {
        res.status(400).json({ error: 'Missing user ID' });
        return;
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
    }

    const user = await userRepository.getById(id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    req.user = user;
    next();
};

export default validateUserMiddleware;
