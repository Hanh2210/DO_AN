const jwt = require('jsonwebtoken');
const generateToken = (claims, options) => new Promise((resolve, reject) => {
    jwt.sign(claims, process.env.JWT_SECRET, options, (error, newToken) => {
        if(error) reject(error);
        else resolve(newToken);
    });
});

const verifyToken = token => new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
        if(error) reject(error);
        else resolve(data);
    });
});

module.exports = {generateToken, verifyToken}