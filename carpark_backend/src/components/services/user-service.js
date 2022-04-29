const Errors = require("../../constants/error-constant");
const JWT_CONSTANT = require("../../constants/jwt-constant");
const { hash, compare } = require("../../utils/bcrypt");
const { generateToken } = require("../../utils/jwt");
const Validation = require("../../utils/validation");
const { User, USER_ROLE, USER_STATUS } = require("../models/user");
const UserRepository = require("../repositories/user-repo");

const register = async (phonenumber, username, password) => {
    Validation.validatePhonenumber(phonenumber);
    Validation.validateUsername(username);
    Validation.validatePassword(password);

    const users = await UserRepository.getByPhonenumber(phonenumber);
    if(users.length > 0) throw new Error(Errors.PHONENUMBER_ALREADY_EXISTS.message);

    const passwordHashing = hash(password);
    const user = new User(undefined, username, undefined, undefined, phonenumber, passwordHashing, USER_ROLE.USER, USER_STATUS.ACTIVE);
    const idUser = await UserRepository.insertUser(user);
    return { idUser };
}

const login = async (phonenumber, password) => {
    Validation.validatePhonenumber(phonenumber);
    Validation.validatePassword(password);

    const users = await UserRepository.getByPhonenumber(phonenumber);
    
    if(users.length == 0) throw new Error(Errors.PHONENUMBER_DOES_NOT_EXISTS.message);
    else {
        const user = users[0];
        const isInvalidPassword = compare(password, user.password);
        if(!isInvalidPassword) throw new Error(Errors.INVALID_PASSWORD.message);

        const token = await generateToken(
            { 
                idUser: user.id, 
                type: JWT_CONSTANT.TOKEN_TYPE.ACCESS_TOKEN, 
                expiresAt: new Date(Date.now() + JWT_CONSTANT.EXPIRES_OF_TOKEN), 
                roles: user.roles
            },
            { expiresIn: JWT_CONSTANT.EXPIRES_OF_TOKEN }); //1h
        const refreshToken = await generateToken(
            { 
                idUser: user.id, 
                type: JWT_CONSTANT.TOKEN_TYPE.REFRESH_TOKEN, 
                expiresAt: new Date(Date.now() + JWT_CONSTANT.EXPIRES_OF_REFRESH_TOKEN), 
            },
            { expiresIn: JWT_CONSTANT.EXPIRES_OF_REFRESH_TOKEN }); //2days
        const tokenInfo = {
            accessToken: token,
            refreshToken: refreshToken,
            roles: user.roles,
            expiresAt: new Date(Date.now() + JWT_CONSTANT.EXPIRES_OF_TOKEN)
        }
        return tokenInfo;
    }
}

const editUser = async (user) => {
    await UserRepository.updateUser(user);
    UserRepository.getById(user.id)
        .then(rs => rs)
        .catch(err => {
            console.log(JSON.stringify(err));
            throw new Error(Errors.SQL_ERROR.message);
        })
}

const getDetailUser = async (id) => {
    const users = await UserRepository.getById(id);
    if(users.length == 0) throw new Error(Errors.USER_DOES_NOT_EXISTS.message);

    return users[0];
}

const searchUser = async (searchKeyword, page=1, recordPerPage=10) => {
    const users = await UserRepository.searchUser(searchKeyword, page, recordPerPage);
    const total = await UserRepository.countTotalUsers(searchKeyword).then(rs => rs[0].total);

    return {
        page: page,
        recordsPerPage: recordPerPage,
        total: total,
        data: users
    };
}

const UserService = { register, login, editUser, getDetailUser, searchUser }

module.exports = UserService;