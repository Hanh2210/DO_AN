const PARKING_TICKET_INFOR_STATUS = {
    USING: 1,
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