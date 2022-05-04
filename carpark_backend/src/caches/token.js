const JWT_CONSTANT = require("../constants/jwt-constant");
const REDIS_CONSTANT = require("../constants/redis-constant");
const redisClient = require("../utils/cache");

const addCacheToken = async (idUser, sign) => {
    //có thể giới hạn số lượng token ở đây
    await redisClient.hSet(REDIS_CONSTANT.TOKEN_OF_USER + idUser, sign, JWT_CONSTANT.TOKEN_TYPE.ACCESS_TOKEN)
        .catch(err => {
            console.log(JSON.stringify(err));
            throw new Error(err.message);
        });
}

const removeToken = async (idUser, sign) => {
    await redisClient.hDel(REDIS_CONSTANT.TOKEN_OF_USER + idUser, sign)
        .then(rs => rs)
        .catch(err => {
            console.log(JSON.stringify(err));
            throw new Error(err.message);
        });
}

const removeAllTokenByIdUser = async (idUser) => {
    await redisClient.del(REDIS_CONSTANT.TOKEN_OF_USER + idUser)
        .catch(err => {
            console.log(JSON.stringify(err));
            throw new Error(err.message);
        });
}

const checkExistsToken = async (idUser, sign) => {
    return await redisClient.hExists(REDIS_CONSTANT.TOKEN_OF_USER + idUser, sign)
        .then(rs => rs)
        .catch(err => {
            console.log(JSON.stringify(err));
            throw new Error(err.message);
        });
}

module.exports = { addCacheToken, removeToken, checkExistsToken, removeAllTokenByIdUser }