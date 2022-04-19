const Errors = {
    NOT_FOUND: {
        code: 404,
        message: 'Resource not found!'
    },
    INVALID_PHONENUMBER: {
        code: 400,
        message: 'Invalid phonenumber!'
    },
    INVALID_USERNAME: {
        code: 400,
        message: 'Invalid username!'
    },
    INVALID_PASSWORD: {
        code: 400,
        message: 'Invalid password!!'
    },
    PHONENUMBER_ALREADY_EXISTS: {
        code: 400,
        message: 'Phonenumber already exists!'
    },
    PHONENUMBER_DOES_NOT_EXISTS: {
        code: 400,
        message: 'Phonenumber does not exists!'
    },
    INVALID_TOKEN: {
        code: 400,
        message: 'Invalid token!'
    },
    UNAUTHORIZED: {
        code: 403,
        message: 'Unauthorized!'
    },
    TOKEN_EXPIRES: {
        code: 400,
        message: 'Token expires!'
    },
    USER_DOES_NOT_EXISTS: {
        code: 400,
        message: 'User does not exists!'
    }
}

module.exports = Errors;