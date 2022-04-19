const Errors = require('../constants/error-constant');
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
                console.log(Errors.INVALID_TOKEN.message);
                next(new Error(Errors.INVALID_TOKEN.message));
            }
        } else {
           next(new Error(Errors.UNAUTHORIZED.message));
        }
    } else {
        next(new Error(Errors.UNAUTHORIZED.message));
    }
};

module.exports = {authMiddleware};