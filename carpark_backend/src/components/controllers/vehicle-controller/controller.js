
const commonResponse = require("../../../utils/common-response");
const { Vehicle } = require("../../models/vehicle");
const VehicleService = require("../../services/vehicle-service");

const addNewVehicle = async (req, resp) => {
    const { type, lincensePlate, color, vehicleBrand } = req.body;
    
    const idUser = req.tokenDecode.idUser;
    if(!idUser) throw new Error(Errors.UNAUTHORIZED.message);

    const vehicleRequest = new Vehicle(undefined, idUser, type, lincensePlate, color, vehicleBrand, undefined);
    await VehicleService.addVehicle(vehicleRequest)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const getAllVehicles = async (req, resp) => {

    const idUser = req.tokenDecode.idUser;
    if(!idUser) throw new Error(Errors.UNAUTHORIZED.message);

    await VehicleService.getAllVehicles(idUser)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const detailVehicle = async (req, resp) => {
    const { id } = req.params;

    const { idUser } = req.tokenDecode;
    if(!idUser) throw new Error(Errors.UNAUTHORIZED.message);

    await VehicleService.detailVehicleForUser(id, idUser)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const updateVehicle = async (req, resp) => {
    const { id } = req.params;
    const { type, lincensePlate, color, vehicleBrand } = req.body;
    
    const idUser = req.tokenDecode.idUser;
    if(!idUser) throw new Error(Errors.UNAUTHORIZED.message);

    const vehicleRequest = new Vehicle(id, idUser, type, lincensePlate, color, vehicleBrand, undefined);
    
    await VehicleService.updateVehicle(vehicleRequest)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const deleteVehicle = async (req, resp) => {
    const { id } = req.params;

    const idUser = req.tokenDecode.idUser;
    if(!idUser) throw new Error(Errors.UNAUTHORIZED.message);

    await VehicleService.deleteVehicle(id, idUser)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

module.exports = { addNewVehicle, getAllVehicles, detailVehicle, updateVehicle, deleteVehicle }