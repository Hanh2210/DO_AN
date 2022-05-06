const Errors = require("../../constants/error-constant");
const { query } = require("../../utils/query");
const { ParkingTicketInfo } = require("../models/parking-ticket-info");

const CarparkingTicketInfoRepository = {
    insertTicket: async (ticketInfor) => {
        const statement = `INSERT INTO tbl_parking_ticket_infor(id_vehicle, id_carpark, start_time, end_time, price, status)
            VALUES (?, ?, ?, ?, ?, ?)`;
    
        return await query(statement, [ticketInfor.idVehicle, ticketInfor.idCarpark, ticketInfor.startTime, ticketInfor.endTime, ticketInfor.price, ticketInfor.status])
            .then(result => result.insertId)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    getById: async (id) => {
        const statement = `SELECT tbl_parking_ticket_infor.id, tbl_parking_ticket_infor.id_vehicle, 
                tbl_parking_ticket_infor.id_carpark, tbl_parking_ticket_infor.start_time, 
                tbl_parking_ticket_infor.end_time, tbl_parking_ticket_infor.price, tbl_parking_ticket_infor.status,
                tbl_vehicle.lincense_plate, tbl_vehicle.vehicle_brand,
                tbl_carpark.name, tbl_carpark.address 
            FROM tbl_parking_ticket_infor 
                INNER JOIN tbl_vehicle ON tbl_parking_ticket_infor.id_vehicle = tbl_vehicle.id
                INNER JOIN tbl_carpark ON tbl_parking_ticket_infor.id_carpark = tbl_carpark.id
            WHERE tbl_parking_ticket_infor.id = ?`;

        return await query(statement, id)
            .then(results => {
                return results.map(ticketInfor => {
                    const ticket = new ParkingTicketInfo(ticketInfor.id, ticketInfor.id_vehicle, ticketInfor.id_carpark,
                    ticketInfor.start_time, ticketInfor.end_time, ticketInfor.price, ticketInfor.status);
                    ticket.vehicle = {
                        lincensePlate: ticketInfor.lincense_plate,
                        vehicleBrand: ticketInfor.vehicle_brand,
                    };
                    ticket.carpark = {
                        name: ticketInfor.name,
                        address: ticketInfor.address
                    }
                    return ticket;
                });
            })
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    getByUserId: async (id, idUser) => {
        const statement = `SELECT tbl_parking_ticket_infor.id, tbl_parking_ticket_infor.id_vehicle, 
                tbl_parking_ticket_infor.id_carpark, tbl_parking_ticket_infor.start_time, 
                tbl_parking_ticket_infor.end_time, tbl_parking_ticket_infor.price, tbl_parking_ticket_infor.status,
                tbl_vehicle.lincense_plate, tbl_vehicle.vehicle_brand,
                tbl_carpark.name, tbl_carpark.address 
            FROM tbl_parking_ticket_infor 
                INNER JOIN tbl_vehicle ON tbl_parking_ticket_infor.id_vehicle = tbl_vehicle.id
                INNER JOIN tbl_carpark ON tbl_parking_ticket_infor.id_carpark = tbl_carpark.id
                INNER JOIN tbl_user ON tbl_vehicle.id_user = tbl_user.id
            WHERE tbl_parking_ticket_infor.id = ?
                AND tbl_user.id = ?`;

        return await query(statement, [id, idUser])
            .then(results => {
                return results.map(ticketInfor => {
                    const ticket = new ParkingTicketInfo(ticketInfor.id, ticketInfor.id_vehicle, ticketInfor.id_carpark,
                    ticketInfor.start_time, ticketInfor.end_time, ticketInfor.price, ticketInfor.status);
                    ticket.vehicle = {
                        lincensePlate: ticketInfor.lincense_plate,
                        vehicleBrand: ticketInfor.vehicle_brand,
                    };
                    ticket.carpark = {
                        name: ticketInfor.name,
                        address: ticketInfor.address
                    }
                    return ticket;
                });
            })
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    searchTicket: async (page = 1, recordPerPage = 10) => {
        //TODO filter
        const statement = `SELECT tbl_parking_ticket_infor.id, tbl_parking_ticket_infor.id_vehicle, 
                tbl_parking_ticket_infor.id_carpark, tbl_parking_ticket_infor.start_time, 
                tbl_parking_ticket_infor.end_time, tbl_parking_ticket_infor.price, tbl_parking_ticket_infor.status,
                tbl_vehicle.lincense_plate, tbl_vehicle.vehicle_brand,
                tbl_carpark.name, tbl_carpark.address 
            FROM tbl_parking_ticket_infor 
                INNER JOIN tbl_vehicle ON tbl_vehicle.id = tbl_parking_ticket_infor.id_vehicle
                INNER JOIN tbl_carpark ON tbl_parking_ticket_infor.id_carpark = tbl_carpark.id
            LIMIT ?
            OFFSET ?`;

        return await query(statement, [recordPerPage, recordPerPage * (page - 1)])
            .then(results => {
                return results.map(ticketInfor => {
                    const ticket = new ParkingTicketInfo(ticketInfor.id, ticketInfor.id_vehicle, ticketInfor.id_carpark,
                    ticketInfor.start_time, ticketInfor.end_time, ticketInfor.price, ticketInfor.status);
                    ticket.vehicle = {
                        lincensePlate: ticketInfor.lincense_plate,
                        vehicleBrand: ticketInfor.vehicle_brand,
                    };
                    ticket.carpark = {
                        name: ticketInfor.name,
                        address: ticketInfor.address
                    }
                    return ticket;
                });    
            }).catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    countTotalTickets: async () => {
        //TODO filter
        const statement = `SELECT COUNT(*) as total FROM tbl_parking_ticket_infor`;

        return await query(statement, [])
            .then(result => result)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    searchTicketsForUser: async (idUser, page = 1, recordPerPage = 10) => {
        //TODO filter
        const statement = `SELECT tbl_parking_ticket_infor.id, tbl_parking_ticket_infor.id_vehicle, 
                tbl_parking_ticket_infor.id_carpark, tbl_parking_ticket_infor.start_time, 
                tbl_parking_ticket_infor.end_time, tbl_parking_ticket_infor.price, tbl_parking_ticket_infor.status,
                tbl_vehicle.lincense_plate, tbl_vehicle.vehicle_brand,
                tbl_carpark.name, tbl_carpark.address 
            FROM tbl_parking_ticket_infor 
                INNER JOIN tbl_vehicle ON tbl_vehicle.id = tbl_parking_ticket_infor.id_vehicle
                INNER JOIN tbl_carpark ON tbl_parking_ticket_infor.id_carpark = tbl_carpark.id
            WHERE
                tbl_vehicle.id_user = ?
            ORDER BY tbl_parking_ticket_infor.start_time DESC
            LIMIT ?
            OFFSET ?`;

        return await query(statement, [idUser, recordPerPage, recordPerPage * (page - 1)])
            .then(results => {
                return results.map(ticketInfor => {
                    const tiket = new ParkingTicketInfo(ticketInfor.id, ticketInfor.id_vehicle, ticketInfor.id_carpark,
                    ticketInfor.start_time, ticketInfor.end_time, ticketInfor.price, ticketInfor.status);
                    tiket.vehicle = {
                        lincensePlate: ticketInfor.lincense_plate,
                        vehicleBrand: ticketInfor.vehicle_brand,
                    };
                    tiket.carpark = {
                        name: ticketInfor.name,
                        address: ticketInfor.address
                    }
                    return tiket;
                });
            }).catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    countTotalTicketsForUser: async (idUser) => {
        //TODO filter
        const statement = `SELECT COUNT(*) as total FROM tbl_parking_ticket_infor
            INNER JOIN tbl_vehicle ON tbl_vehicle.id = tbl_parking_ticket_infor.id_vehicle
            WHERE
                tbl_vehicle.id_user = ?`;

        return await query(statement, [idUser])
            .then(result => result)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    updateCarpark: async function (ticket) {
        const tempTicket = await this.getById(ticket.id).then(rs => rs[0]);
        
        const statement = `UPDATE tbl_parking_ticket_infor
            SET tbl_parking_ticket_infor.start_time = ?, 
                tbl_parking_ticket_infor.end_time = ?, 
                tbl_parking_ticket_infor.price = ?, 
                tbl_parking_ticket_infor.status = ?
            WHERE tbl_parking_ticket_infor.id = ?`
        const params = [];

        if(ticket.startTime) params.push(ticket.startTime)
        else params.push(tempTicket.startTime);

        if(ticket.endTime) params.push(ticket.endTime)
        else params.push(tempTicket.endTime);

        if(ticket.price) params.push(ticket.price)
        else params.push(tempTicket.price);

        if(ticket.status != undefined) params.push(ticket.status)
        else params.push(tempTicket.status);

        params.push(tempTicket.id);
        
        return await query(statement, params)
            .then(result => result)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
    checkAuthorTicket: async (idTicket, idUser) => {
        //TODO filter
        const statement = `SELECT COUNT(*) as countTicket FROM tbl_parking_ticket_infor
            INNER JOIN tbl_vehicle ON tbl_vehicle.id = tbl_parking_ticket_infor.id_vehicle
            INNER JOIN tbl_user ON tbl_user.id = tbl_vehicle.id_user
            WHERE tbl_parking_ticket_infor.id = ?
                AND tbl_vehicle.id_user = ?`;

        return await query(statement, [idTicket, idUser])
            .then(result => result.countTicket)
            .catch(err => {
                console.log(err);
                throw new Error(Errors.SQL_ERROR.message);   
            });
    },
}

module.exports = CarparkingTicketInfoRepository;