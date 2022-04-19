const VEHICLE_TYPE = {
    CAR: 'CAR',
    MOTORCYCLE: 'MOTORCYCLE',
    BICYCLE: 'BICYCLE',
};

const VEHICLE_STATUS = {
    ACTIVE: 1,
    PARKING: 2,
    DELETED: 0
};

function Vehicle(id, idUser, type, lincensePlate, color, vehicleBrand, status) {
    this.id = id;
    this.idUser = idUser;
    this.type = type;
    this.lincensePlate = lincensePlate;
    this.color = color;
    this.vehicleBrand = vehicleBrand;
    this.status = status;
};

module.exports = { Vehicle, VEHICLE_TYPE, VEHICLE_STATUS};