const Errors = require("../constants/error-constant");

const controllerHandler = controller => {
    return async (req, resp, next) => {
        try {
            await controller(req, resp, next);
        } catch (error) {
            next(error);
        }
    }
};

const errorHandler = (error, req, resp, next) => {
    const err = Object.values(Errors).find(e => e.message == error.message);
    if(err) {
        console.log(`ERROR! code: ${err.code}, message: ${err.message}`);
        resp.status(err.code).json(err);
    } else {
        console.log(`ERROR: ${JSON.stringify(error)}`);
        resp.status(500).json({code: 500, message: error.message});
    }
}

module.exports = { controllerHandler, errorHandler };