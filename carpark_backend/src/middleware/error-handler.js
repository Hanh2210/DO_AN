const Errors = require('../constants/error-contanst');

const controllerHandler = controller => {
    return async (req, resp, next) => {
        try {
            controller(req, resp, next);
        } catch (error) {
            next(error);
        }
    }
};

const errorHandler = (error, req, resp, next) => {
    console.log('aa', error);
    if(error in Errors.values()) {
        console.log(`ERROR! status: ${error.status}, message: ${error.message}`);
        resp.status(error.status).json(error);
    } else {
        const err = Errors.values().find(e => e.message == error.message);
        console.log(`ERROR! status: ${err.status}, message: ${err.message}`);
        resp.status(error.status).json(err);
    }
}

module.exports = { controllerHandler, errorHandler };