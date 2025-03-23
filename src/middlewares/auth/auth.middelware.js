import { decodeJWT } from "../../helpers/jwt.helper.js";
import memberRepository from "../../repositories/member.repository.js";

export function authentificationMiddleware() {
    return function (req, res, next) {
        const authData = req.headers['authorization'];

        const token = authData && authData.split(' ')[1];

        if (!token) {
            req.token = undefined;
            next();
            return;
        }

        decodeJWT(token)
            .then(data => req.token = data)
            .catch(error => req.token = undefined)
            .finally(() => next());
    }
}

export async function authorizationMiddleware(adminOnly = false) {
    return async function (req, res, next) {
        const token = req.token;

        if (!token) {
            res.sendStatus(401);
            return;
        }

        
        const groupId = parseInt(req.params.id); // Action on a group so id in the params ??

        if (!groupId || groupId < 1) {
            res.sendStatus(404);
            return;
        }

        const userId = token.id;

        // Function to check if the person connected is part of the group and if he is admin
        const member = await memberRepository.getByUserAndGroup(userId, groupId);

        if (member.length === 0) {
            return res.sendStatus(403);
        }

        if (adminOnly && member[0].role !== 'ADMIN') {
            res.sendStatus(403);
        }

        next();
    }
}