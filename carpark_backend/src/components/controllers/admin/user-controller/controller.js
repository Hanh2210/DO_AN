const UserService = require("../../../services/user-service");

const searchUser = async (req, resp) => {
    const { searchKeyword, page, recordPerPage } = req.query;
    await UserService.searchUser(searchKeyword, page, recordPerPage)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const detailUser = async (req, resp) => {
    const { id } = req.params;
    await UserService.getDetailUser(id)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

module.exports = { searchUser, detailUser }