import memberRepository from '../../repositories/member.repository.js';
import userRepository from '../../repositories/user.repository.js';

const validateNewMemberMiddleWare = async (req, res, next) => {
    if (!req.body.userId || !req.body.role) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }

    const { userId, role } = req.body;

    console.log(role.toUpperCase() !== 'MEMBER');

    if (role.toUpperCase() !== 'ADMIN' && role.toUpperCase() !== 'MEMBER') {
        res.status(400).json({ error: "Role must be either 'ADMIN' or 'MEMBER'" });
        return;
    }

    const user = userRepository.getById(parseInt(userId));

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    req.body.role = req.body.role.toUpperCase();

    next();
}

export default validateNewMemberMiddleWare;