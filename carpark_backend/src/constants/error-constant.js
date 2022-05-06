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
        code: 404,
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
        code: 404,
        message: 'User does not exists!'
    },
    INVALID_CARPARKNAME: {
        code: 400,
        message: 'Invalid carpark name!'
    },
    INVALID_CARPARK_ADDRESS: {
        code: 400,
        message: 'Invalid carpark address!'
    },
    INVALID_CARPARK_TOTAL_SLOTS: {
        code: 400,
        message: 'Invalid carpark total slots!'
    },
    INVALID_CARPARK_PRICE: {
        code: 400,
        message: 'Invalid carpark price!'
    },
    CARPARK_DOES_NOT_EXISTS: {
        code: 404,
        message: 'Carpark does not exists!'
    },
    SQL_ERROR: {
        code: 500,
        message: 'Some errors when executing!'
    },
    IDUSER_CANNOT_BE_NULL: {
        code: 400,
        message: 'idUser cannot be empty!'
    },
    VEHICLE_TYPE_CANNOT_BE_NULL: {
        code: 400,
        message: 'Vehicle type cannot be empty!'
    },
    VEHICLE_TYPE_CANNOT_BE_NULL: {
        code: 400,
        message: 'Vehicle type cannot be empty!'
    },
    LINCENSE_PLATE_CANNOT_BE_NULL: {
        code: 400,
        message: 'Lincense plate cannot be empty!'
    },
    VEHICLE_COLOR_CANNOT_BE_NULL: {
        code: 400,
        message: 'Vehicle color cannot be empty!'
    },
    VEHICLE_BRANCH_CANNOT_BE_NULL: {
        code: 400,
        message: 'Vehicle color cannot be empty!'
    },
    VEHICLE_DOES_NOT_EXISTS: {
        code: 400,
        message: 'Vehicle dose not exists!'
    },
    IDVEHICLE_CANNOT_BE_NULL: {
        code: 400,
        message: 'idVehicle cannot be empty!'
    },
    IDCARPARK_CANNOT_BE_NULL: {
        code: 400,
        message: 'idCarpark cannot be empty!'
    },
    TICKET_DOES_NOT_EXISTS: {
        code: 404,
        message: 'Parking ticket id does not exists!'
    },
    TICKET_IS_REJECTED_BECAUSE_CARPARK_IS_FULL: {
        code: 400,
        message: 'Parking ticket is rejected because the carpark is full!'
    },
    TICKET_CAN_NOT_CANCEL: {
        code: 400,
        message: 'Tickets cannot be canceled!'
    },
    TICKET_CAN_NOT_APPROVED: {
        code: 400,
        message: 'This ticket cannot be approved!'
    },
    TICKET_CAN_NOT_REJECTED: {
        code: 400,
        message: 'This ticket cannot be rejected!'
    },
    TICKET_CAN_NOT_RETURN: {
        code: 400,
        message: 'This ticket cannot be return!'
    },
    REFRESH_TOKEN_CANNOT_BE_NULL: {
        code: 400,
        message: 'Refresh token cannot be empty!'
    },
    CHANGE_PASSWORD_FAIL: {
        code: 400,
        message: 'Change password fail!'
    },
    PARAM_YEAR_CAN_BE_NOT_NULL: {
        code: 400,
        message: 'Param "year" can be not null!'
    },
}

module.exports = Errors;