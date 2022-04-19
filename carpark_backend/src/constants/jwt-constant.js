const JWT_CONSTANT = {
    EXPIRES_OF_TOKEN: 3600000,
    EXPIRES_OF_REFRESH_TOKEN: 86400000,
    TOKEN_TYPE: {
        ACCESS_TOKEN: 'access_token',
        REFRESH_TOKEN: 'refresh_token'
    }
}

module.exports = JWT_CONSTANT;