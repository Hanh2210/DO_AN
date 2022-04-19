const commonResponse = (httpResponse, responseData, code=200, message='ok') => {
    httpResponse.status(code).json({
        code: code,
        message: message,
        data: responseData
    });
};

module.exports = commonResponse;