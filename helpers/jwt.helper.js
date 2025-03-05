import jwt from 'jsonwebtoken';
import memberRepository from '../src/repositories/member.repository.js';

export function generateJWT({ id, name, email }) {
    return new Promise(async (resolve, reject) => {

        const memberData = await memberRepository.getByUserId(id);

        const member = memberData[0].dataValues;

        const data = {
            id,
            name,
            email,
            role: (member) ? member.role : undefined
        };

        const secret = process.env.JWT_SECRET;

        const options = {
            algorithm: 'HS512',
            expiresIn: '2h',
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        };

        jwt.sign(data, secret, options, (error, token) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(token);
        });

    });
}

export function decodeJWT(token) {
    return new Promise((resolve, reject) => {
        const options = {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        };

        const secret = process.env.JWT_SECRET;

        jwt.verify(token, secret, options, (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(data);
        });
    });
}