const Errors = require("../../constants/error-constant");
const { ParkingTicketInfo, PARKING_TICKET_INFOR_STATUS } = require("../models/parking-ticket-info");
const CarparkRepository = require("../repositories/carpark-repo");
const CarparkingTicketInfoRepository = require("../repositories/carparking-ticket-info-repo");
const VehicleRepository = require("../repositories/vehicle-repo");

const bookTicket = async (idVehicle, idCarpark) => {
    if(!idVehicle) throw new Error(Errors.IDVEHICLE_CANNOT_BE_NULL.message);
    const vehicles = await VehicleRepository.getById(idVehicle);
    if(vehicles.length == 0) throw new Error(Errors.VEHICLE_DOES_NOT_EXISTS.message);

    if(!idCarpark) throw new Error(Errors.IDCARPARK_CANNOT_BE_NULL.message);
    const carparks = await CarparkRepository.getById(idCarpark);
    if(carparks.length == 0) throw new Error(Errors.CARPARK_DOES_NOT_EXISTS.message);

    const ticket = new ParkingTicketInfo();
    ticket.idVehicle = idVehicle;
    ticket.idCarpark = idCarpark;
    ticket.price = carparks[0].price;
    
    ticket.status = PARKING_TICKET_INFOR_STATUS.PENDING;
    const idTicket = await CarparkingTicketInfoRepository.insertTicket(ticket);

    return await CarparkingTicketInfoRepository.getById(idTicket).then(rs => rs[0]);
}

const checkTicket = async (idTicket) => {
    const tickets = await CarparkingTicketInfoRepository.getById(idTicket);
    if(tickets.length == 0) throw new Error(Errors.TICKET_DOES_NOT_EXISTS.message);

    const ticket = tickets[0];
    //check empty slot ?
    const carpark = await CarparkRepository.getById(ticket.idCarpark)
        .then(rs => rs[0])
        .catch(err => {
            console.log(JSON.stringify(err));
            throw new Error(Errors.CARPARK_DOES_NOT_EXISTS.message);
        });

    if(carpark.numberOfEmptySlots > 0) {
        if(ticket.status == PARKING_TICKET_INFOR_STATUS.PENDING) {
            //accept
            const now = new Date().toISOString().slice(0,19).replace('T', ' ');
            ticket.startTime = now;
            ticket.status = PARKING_TICKET_INFOR_STATUS.USING;
            await CarparkingTicketInfoRepository.updateCarpark(ticket);

            //update empty slot in carpark
            carpark.numberOfEmptySlots--; //nếu nhiều request cùng lúc sẽ bị lỗi ==> fix bằng cách gọi function hoặc proceduce
            await CarparkRepository.updateCarpark(carpark);
            
            return await CarparkingTicketInfoRepository.getById(idTicket).then(rs => rs[0]);
        } else {
            throw new Error(Errors.TICKET_CAN_NOT_APPROVED.message);
        }
    } else {
        //reject
        ticket.status = PARKING_TICKET_INFOR_STATUS.REJECT;
        await CarparkingTicketInfoRepository.updateCarpark(ticket)
        throw new Error(Errors.TICKET_IS_REJECTED_BECAUSE_CARPARK_IS_FULL.message);
    }
}

const rejectTicket = async (idTicket) => {
    const tickets = await CarparkingTicketInfoRepository.getById(idTicket);
    if(tickets.length == 0) throw new Error(Errors.TICKET_DOES_NOT_EXISTS.message);
    const ticket = tickets[0];

    if(ticket.status == PARKING_TICKET_INFOR_STATUS.PENDING) {
        ticket.status = PARKING_TICKET_INFOR_STATUS.REJECT;
        await CarparkingTicketInfoRepository.updateCarpark(ticket);
    } else {
        throw new Error(Errors.TICKET_CAN_NOT_REJECTED.message);
    }

    return {};
}

const checkAuthorOfTicket = async (idTicket, idUser) => {
    return await CarparkingTicketInfoRepository.checkAuthorTicket(idTicket, idUser)
        .then(total => total > 0)
        .catch(err => {
            console.log(JSON.stringify(err));
            throw new Error(Errors.SQL_ERROR.message);
        })
}

const cancelTicket = async (idTicket, idUser) => {
    const tickets = await CarparkingTicketInfoRepository.getById(idTicket);
    if(tickets.length == 0) throw new Error(Errors.TICKET_DOES_NOT_EXISTS.message);
    const ticket = tickets[0];

    if(!checkAuthorOfTicket(idTicket, idUser)) {
        throw new Error(Errors.UNAUTHORIZED.message);
    };

    if(ticket.status != PARKING_TICKET_INFOR_STATUS.PENDING) {
        throw new Error(Errors.TICKET_CAN_NOT_CANCEL.message);
    }
    ticket.status = PARKING_TICKET_INFOR_STATUS.CANCELED;
    await CarparkingTicketInfoRepository.updateCarpark(ticket);

    return {};
}

const returnTicket = async (idTicket, idUser) => {
    const tickets = await CarparkingTicketInfoRepository.getById(idTicket);
    if(tickets.length == 0) throw new Error(Errors.TICKET_DOES_NOT_EXISTS.message);
    const ticket = tickets[0];

    if(!checkAuthorOfTicket(idTicket, idUser)) {
        throw new Error(Errors.UNAUTHORIZED.message);
    };

    if(ticket.status == PARKING_TICKET_INFOR_STATUS.USING) {
        const carpark = await CarparkRepository.getById(ticket.idCarpark)
        .then(rs => rs[0])
        .catch(err => {
            console.log(JSON.stringify(err));
            throw new Error(Errors.CARPARK_DOES_NOT_EXISTS.message);
        });
    
        const now = new Date().toISOString().slice(0,19).replace('T', ' ');
        ticket.endTime = now;
        ticket.status = PARKING_TICKET_INFOR_STATUS.USED;
        await CarparkingTicketInfoRepository.updateCarpark(ticket);
        //update empty slot in carpark
        carpark.numberOfEmptySlots++; //nếu nhiều request cùng lúc sẽ bị lỗi ==> fix bằng cách gọi function hoặc proceduce
        await CarparkRepository.updateCarpark(carpark);
    
        return await CarparkingTicketInfoRepository.getById(idTicket).then(rs => rs[0]);
    } else {
        throw new Error(Errors.TICKET_CAN_NOT_RETURN.message);
    }
}

const searchTickets = async (page=1, recordPerPage=10) => {
    const tickets = await CarparkingTicketInfoRepository.searchTicket(page, recordPerPage);
    const total = await CarparkingTicketInfoRepository.countTotalTickets().then(rs => rs[0].total);

    return {
        page: page,
        recordsPerPage: recordPerPage,
        total: total,
        data: tickets
    };
}

const detailTicket = async (id) => {
    const tickets = await CarparkingTicketInfoRepository.getById(id);
    if(tickets.length == 0) throw new Error(Errors.TICKET_DOES_NOT_EXISTS.message);

    return tickets[0];
}

const detailTicketForUser = async (idTicket, idUser) => {
    const tickets = await CarparkingTicketInfoRepository.getByUserId(idTicket, idUser);
    if(tickets.length == 0) throw new Error(Errors.TICKET_DOES_NOT_EXISTS.message);

    return tickets[0];
}

const searchTicketsForUser = async (idUser, page=1, recordPerPage=10) => {
    const tickets = await CarparkingTicketInfoRepository.searchTicketsForUser(idUser, page, recordPerPage);
    const total = await CarparkingTicketInfoRepository.countTotalTicketsForUser(idUser).then(rs => rs[0].total);

    return {
        page: page,
        recordsPerPage: recordPerPage,
        total: total,
        data: tickets
    };
}

const CarparkingTicketInfoService = { bookTicket, checkTicket, rejectTicket, returnTicket, cancelTicket, searchTickets, searchTicketsForUser, detailTicket, detailTicketForUser }

module.exports = CarparkingTicketInfoService;