const Errors = require("../../constants/error-constant");
const { VEHICLE_STATUS } = require("../models/vehicle");
const VehicleRepository = require("../repositories/vehicle-repo");

const addVehicle = async (vehicleRequest) => {
    if(!vehicleRequest.idUser) throw new Error(Errors.IDUSER_CANNOT_BE_NULL.message);
    if(!vehicleRequest.type) throw new Error(Errors.VEHICLE_TYPE_CANNOT_BE_NULL.message);
    if(!vehicleRequest.lincensePlate) throw new Error(Errors.LINCENSE_PLATE_CANNOT_BE_NULL.message);
    if(!vehicleRequest.color) throw new Error(Errors.VEHICLE_COLOR_CANNOT_BE_NULL.message);
    if(!vehicleRequest.vehicleBrand) throw new Error(Errors.VEHICLE_BRANCH_CANNOT_BE_NULL.message);

    vehicleRequest.status = VEHICLE_STATUS.ACTIVE;
    const idVehicle = await VehicleRepository.insertVehicle(vehicleRequest);
    const vehicle = (await VehicleRepository.getById(idVehicle))[0];
    return vehicle;
}

const searchVehicle = async (searchKeyword='', page=1, recordPerPage=10) => {
    const vehicles = await VehicleRepository.searchVehicle(searchKeyword, page, recordPerPage);
    const total = await VehicleRepository.countTotalVehicles(searchKeyword).then(rs => rs[0].total);
    
    return {
        page: page,
        recordsPerPage: recordPerPage,
        total: total,
        data: vehicles
    };
}

const getAllVehicles = async (idUser) => {
    const vehicles = await VehicleRepository.getByUserId(idUser);
    
    return {
        data: vehicles
    };
}

const detailVehicle = async (id) => {
    const vehicles = await VehicleRepository.getById(id);
    if(vehicles.length == 0) throw new Error(Errors.VEHICLE_DOES_NOT_EXISTS.message);

    return vehicles[0];
}

const detailVehicleForUser = async (id, idUser) => {
    const vehicles = await VehicleRepository.getById(id);
    if(vehicles.length == 0) throw new Error(Errors.VEHICLE_DOES_NOT_EXISTS.message);
    const vehicle = vehicles[0];
    if(vehicle.idUser != idUser) throw new Error(Errors.UNAUTHORIZED.message);

    return vehicle;
}

const updateVehicle = async (vehicle) => {
    const vehicles = await VehicleRepository.getById(vehicle.id);
    if(vehicles.length == 0) throw new Error(Errors.VEHICLE_DOES_NOT_EXISTS.message);

    if(!vehicle.type) vehicle.name = vehicles[0].name;
    if(!vehicle.lincensePlate) vehicle.lincensePlate = vehicles[0].lincensePlate;
    if(!vehicle.color) vehicle.color = vehicles[0].color;
    if(!vehicle.vehicleBrand) vehicle.vehicleBrand = vehicles[0].vehicleBrand;
    if(!vehicle.status) vehicle.status = vehicles[0].status;

    await VehicleRepository.updateVehicle(vehicle);

    const vehilceAfterUpdate = (await VehicleRepository.getById(vehicle.id))[0];

    return vehilceAfterUpdate;
}

const deleteVehicle = async (id, idUser) => {
    const vehicles = await VehicleRepository.getById(id);
    if(vehicles.length == 0) throw new Error(Errors.VEHICLE_DOES_NOT_EXISTS.message);

    if(idUser != vehicles[0].idUser) throw new Error(Errors.UNAUTHORIZED.message);

    await VehicleRepository.deleteVehicle(parseInt(id));

    return {};
}

const VehicleService = { addVehicle, searchVehicle, getAllVehicles, detailVehicle, detailVehicleForUser, updateVehicle, deleteVehicle }

module.exports = VehicleService;