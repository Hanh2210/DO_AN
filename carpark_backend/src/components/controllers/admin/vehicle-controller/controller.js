const commonResponse = require("../../../../utils/common-response");
const VehicleService = require("../../../services/vehicle-service");

const searchVehicle = async (req, resp) => {
    console.log('aa');
    const { searchKeyword, page, recordPerPage } = req.query;
    await VehicleService.searchVehicle(searchKeyword, page, recordPerPage)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const detailVehicle = async (req, resp) => {
    const { id } = req.params;
    await VehicleService.detailVehicle(id)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

module.exports = { searchVehicle, detailVehicle }