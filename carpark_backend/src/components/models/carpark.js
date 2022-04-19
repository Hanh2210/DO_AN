const CARPARK_STATUS = {
    ACTIVE: 1,
    LOCK: 2,
    DELETED: 0
};

function CarPark(id, name, address, numberOfEmptySlots, openTime, closingTime, status) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.numberOfEmptySlots = numberOfEmptySlots;
    this.openTime = openTime;
    this.closingTime = closingTime;
    this.status = status;
};

module.exports = { CarPark, CARPARK_STATUS};