import { decodeJWT } from "../../../helpers/jwt.helper.js";
import memberRepository from "../../repositories/member.repository.js";

export function authentificationMiddelware() {
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

export function authorizationMiddelware(adminOnly = false) {
    return function (req, res, next) {
        const token = req.token;

        if (!token) {
            res.sendStatus(401);
            return;
        }

        if (adminOnly && member.role !== 'ADMIN') {
            res.sendStatus(403);
        }

        next();
    }
}