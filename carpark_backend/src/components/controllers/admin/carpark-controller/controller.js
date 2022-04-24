const commonResponse = require("../../../../utils/common-response");
const { CarPark } = require("../../../models/carpark");
const CarparkService = require("../../../services/carpark-service");

const addNewCarpark = async (req, resp) => {
    const { name, address, numberOfEmptySlots, openTime, closingTime } = req.body;
    
    const carparkRequest = new CarPark(undefined, name, address, numberOfEmptySlots, openTime, closingTime)
    await CarparkService.addCarpark(carparkRequest)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const searchCarpark = async (req, resp) => {
    const { searchKeyword, page, recordPerPage } = req.query;
    await CarparkService.searchCarpark(searchKeyword, page, recordPerPage)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const detailCarpark = async (req, resp) => {
    const { id } = req.params;
    await CarparkService.detailCarpark(id)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const updateCarpark = async (req, resp) => {
    const { id } = req.params;
    const { name, address, numberOfEmptySlots, openTime, closingTime } = req.body;
    
    const carparkRequest = new CarPark(id, name, address, numberOfEmptySlots, openTime, closingTime)
    await CarparkService.updateCarpark(carparkRequest)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const deleteCarpark = async (req, resp) => {
    const { id } = req.params;
    const carpark = new CarPark(id);
    await CarparkService.deleteCarpark(carpark)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

module.exports = { addNewCarpark, searchCarpark, detailCarpark, updateCarpark, deleteCarpark }