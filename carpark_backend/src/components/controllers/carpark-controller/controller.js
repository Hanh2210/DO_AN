const commonResponse = require("../../../utils/common-response");
const CarparkService = require("../../services/carpark-service");

const searchCarpark = async (req, resp) => {
    const { searchKeyword, page, recordPerPage } = req.query;
    await CarparkService.searchCarparkForUser(searchKeyword, page, recordPerPage)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const detailCarpark = async (req, resp) => {
    const { id } = req.params;
    await CarparkService.detailCarpark(id)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

module.exports = { searchCarpark, detailCarpark }