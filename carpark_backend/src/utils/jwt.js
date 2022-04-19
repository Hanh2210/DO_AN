const jwt = require('jsonwebtoken');
const Errors = require('../constants/error-constant');
const generateToken = (claims, options) => new Promise((resolve, reject) => {
    jwt.sign(claims, process.env.JWT_SECRET || 'default', options, (error, newToken) => {
        if(error) reject(error);
        else resolve(newToken);
    });
});

const verifyToken = token => new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET || 'default', (error, data) => {
        if(error) reject(error);
        else {
            const expiresAt = new Date(data.expiresAt);
            const now = new Date();
            if(expiresAt < now) reject(new Error(Errors.TOKEN_EXPIRES.message));

            return resolve(data);
        };
    });
});

module.exports = {generateToken, verifyToken}