const jwtUtil = require('../utils/jwt')

const authMiddleware = async (req, resp, next) => {
    const { authorization } = req.headers;
    if(authorization && authorization.match(/^Bearer /g)) {
        const token = authorization.split(' ')[1];
        if(token) {
            try {
                const tokenDecode = await jwtUtil.verifyToken(token);
                req.tokenDecode = tokenDecode;
                next();
            } catch (e) {
                console.log(e);
                next('token invalid');
            }
        } else {
           next('unauthorized');
        }
    } else {
        next('unauthorized');
    }
};

module.exports = {authMiddleware};