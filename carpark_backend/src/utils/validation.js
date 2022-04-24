const Errors = require("../constants/error-constant");

const Validation = {
    validatePhonenumber: (phonenumber) => {
        if(!phonenumber) throw Error(Errors.INVALID_PHONENUMBER.message);
        let regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
        const result = regex.test(phonenumber);
        if(!result) throw new Error(Errors.INVALID_PHONENUMBER.message);
    },
    validateUsername: (username) => {
        if(!username) throw Error(Errors.INVALID_USERNAME.message);
        let regex = new RegExp(/^[a-zA-Z0-9_]+$/);
        const result = regex.test(username);
        if(!result) throw new Error(Errors.INVALID_USERNAME.message);
    },
    validatePassword: (password) => {
        if(!password || password.length < 6) throw new Error(Errors.INVALID_PASSWORD.message);
    },
    isEmptyString: (str) => {
        if(!str || str.length == 0 || str.trim() == '') return true;
        return false;
    },
};

module.exports = Validation;