import userRepository from '../../repositories/user.repository.js';

const validateCreateGroupMiddleWare = async (req, res, next) => {

    if (!req.body || !req.body.adminGroupId || !req.body.groupName) {
        res.status(400).json({ error: 'Invalid Data' });
        return;
    }
    let { adminGroupId, groupName } = req.body;

    adminGroupId = parseInt(adminGroupId);
    if (isNaN(adminGroupId)) {
        res.status(400).json({ error: 'Invalid adminGroup id' });
        return;
    }

    const user = await userRepository.getById(adminGroupId);
    if (!user) {
        res.status(404).json({ error: 'User not found, cannot be admin of a group' });
        return;
    }
    groupName = groupName?.trim();
    if (!groupName) {
        res.status(400).json({ error: 'Group must have a name' });
        return;
    }
    req.body.adminGroupId = adminGroupId;
    req.body.groupName = groupName;
    next();
}

export default validateCreateGroupMiddleWare;