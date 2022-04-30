const Errors = require("../../constants/error-constant");
const { CARPARK_STATUS } = require("../models/carpark");
const CarparkRepository = require("../repositories/carpark-repo");

const addCarpark = async (carparkRequest) => {
    if(!carparkRequest.name) throw new Error(Errors.INVALID_CARPARKNAME.message);
    if(!carparkRequest.address) throw new Error(Errors.INVALID_CARPARK_ADDRESS.message);
    if(!carparkRequest.totalSlots) throw new Error(Errors.INVALID_CARPARK_TOTAL_SLOTS.message);
    if(!carparkRequest.price) throw new Error(Errors.INVALID_CARPARK_PRICE.message);

    carparkRequest.status = CARPARK_STATUS.ACTIVE;
    const idCarpark = await CarparkRepository.insertCarpark(carparkRequest);

    // const carpark = await CarparkRepository.getById(idCarpark)[0];
    // return carpark;
    return { idCarpark };
}

const searchCarpark = async (searchKeyword, page=1, recordPerPage=10) => {
    const carparks = await CarparkRepository.searchCarpark(searchKeyword, page, recordPerPage)
        .then(rs => rs.map(carpark => {
            carpark['numberOfUsedSlots'] = carpark.totalSlots - carpark.numberOfEmptySlots;
            return carpark;
        }));
    const total = await CarparkRepository.countTotalCarparks(searchKeyword).then(rs => rs[0].total);

    return {
        page: page,
        recordsPerPage: recordPerPage,
        total: total,
        data: carparks
    };
}

const detailCarpark = async (id) => {
    const carparks = await CarparkRepository.getById(id)
        .then(rs => rs.map(carpark => {
            carpark['numberOfUsedSlots'] = carpark.totalSlots - carpark.numberOfEmptySlots;
            return carpark;
        }));;
    if(carparks.length == 0) throw new Error(Errors.CARPARK_DOES_NOT_EXISTS.message);

    return carparks[0];
}

const searchCarparkForUser = async (searchKeyword='', page=1, recordPerPage=10) => {
    const carparks = await CarparkRepository.searchCarparkForUser(searchKeyword, page, recordPerPage)
        .then(rs => rs.map(carpark => {
            carpark['numberOfUsedSlots'] = carpark.totalSlots - carpark.numberOfEmptySlots;
            return carpark;
        }));;
    const total = await CarparkRepository.countTotalCarparksForUser(searchKeyword).then(rs => rs[0].total);

    return {
        page: page,
        recordsPerPage: recordPerPage,
        total: total,
        data: carparks
    };
}

const updateCarpark = async (carpark) => {
    const carparks = await CarparkRepository.getById(carpark.id);
    if(carparks.length == 0) throw new Error(Errors.CARPARK_DOES_NOT_EXISTS.message);

    if(!carpark.name) carpark.name = carparks[0].name;
    if(!carpark.address) carpark.address = carparks[0].address;
    if(!carpark.totalSlots) carpark.totalSlots = carparks[0].totalSlots;
    if(!carpark.price) carpark.price = carparks[0].price;
    if(!carpark.status) carpark.status = carparks[0].status;

    await CarparkRepository.updateCarpark(carpark);

    const carparkAfterUpdate = await CarparkRepository.getById(carpark.id)
        .then(rs => rs.map(carpark => {
            carpark['numberOfUsedSlots'] = carpark.totalSlots - carpark.numberOfEmptySlots;
            return carpark;
        }))
        .then(rs => rs[0])
        .catch(err => {
            console.log('err', JSON.stringify(err));
            throw new Error(err.message);
        });

    return carparkAfterUpdate;
}

const deleteCarpark = async (carpark) => {
    const carparks = await CarparkRepository.getById(carpark.id);
    if(carparks.length == 0) throw new Error(Errors.CARPARK_DOES_NOT_EXISTS.message);

    carpark.status = CARPARK_STATUS.DELETED;
   
    await CarparkRepository.updateCarpark(carpark);

    return {};
}

const CarparkService = { addCarpark, searchCarpark, detailCarpark, updateCarpark, searchCarparkForUser, deleteCarpark }

module.exports = CarparkService;