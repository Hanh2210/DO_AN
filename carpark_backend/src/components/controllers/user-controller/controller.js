const Errors = require("../../../constants/error-constant");
const commonResponse = require("../../../utils/common-response");
const { User } = require("../../models/user");
const UserService = require("../../services/user-service");

const registerController = async (req, resp) => {
    const { phonenumber, username, password } = req.body;
    
    const responseData = await UserService.register(phonenumber, username, password);
    
    commonResponse(resp, responseData);
}

const loginController = async (req, resp) => {
    const { phonenumber, password } = req.body;
    
    const responseData = await UserService.login(phonenumber, password);

    commonResponse(resp, responseData);
}

const editUserController = async (req, resp) => {
    const { id, name, address, email, phonenumber } = req.body;

    if(id != req.tokenDecode.idUser) throw new Error(Errors.UNAUTHORIZED.message);
    
    const user = new User(id, name, address, email, phonenumber);
    
    const responseData = await UserService.editUser(user);

    commonResponse(resp, responseData);
}

const getUserDetail = async (req, resp) => {
    const idUser = req.tokenDecode.idUser;
    const user = await UserService.getDetailUser(idUser);

    const userResponse = {
        id: user.id,
        name: user.name,
        address: user.address,
        email: user.email,
        phonenumber: user.phonenumber,
        roles: user.roles,
        status: user.status
    }
    commonResponse(resp, userResponse);
}

module.exports = { registerController, loginController, editUserController, getUserDetail}