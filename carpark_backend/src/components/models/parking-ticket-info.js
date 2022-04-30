const PARKING_TICKET_INFOR_STATUS = {
    PENDING: 1,
    USING: 2,
    REJECT: 3,
    CANCELED: 4,
    USED: 0
};

function ParkingTicketInfo(id, idVehicle, idCarpark, startTime, endTime, price, status) {
    this.id = id;
    this.idVehicle = idVehicle;
    this.idCarpark = idCarpark;
    this.startTime = startTime;
    this.endTime = endTime;
    this.price = price;
    this.status = status;
};

module.exports = { ParkingTicketInfo, PARKING_TICKET_INFOR_STATUS};