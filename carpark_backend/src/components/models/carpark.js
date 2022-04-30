const CARPARK_STATUS = {
    ACTIVE: 1,
    LOCK: 2,
    DELETED: 0
};

function CarPark(id, name, address, numberOfEmptySlots, totalSlots, price, longitude, latitude, openTime, closingTime, status) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.numberOfEmptySlots = numberOfEmptySlots;
    this.totalSlots = totalSlots;
    this.price = price;
    this.longitude = longitude;
    this.latitude = latitude;
    this.openTime = openTime;
    this.closingTime = closingTime;
    this.status = status;
};

module.exports = { CarPark, CARPARK_STATUS};