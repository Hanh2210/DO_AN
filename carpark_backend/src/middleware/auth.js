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

                //check authorization 
                if(req.route.path.startsWith('/admin')) {
                    const roles = tokenDecode.roles.split(',').map(r => r.toUpperCase())
                    
                    if(!(roles.some(e => e == 'ADMIN'))) {
                        next(new Error(Errors.UNAUTHORIZED.message));
                        return
                    }
                }

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