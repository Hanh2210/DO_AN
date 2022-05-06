const Errors = require("../../../constants/error-constant");
const commonResponse = require("../../../utils/common-response");
const CarparkingTicketInfoService = require("../../services/carparking-ticket-info-service");

const bookTicket = async (req, resp) => {
    const { idVehicle, idCarpark } = req.body;
    
    await CarparkingTicketInfoService.bookTicket(idVehicle, idCarpark)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const searchTickets = async (req, resp) => {
    const { idUser } = req.tokenDecode;
    if(!idUser) throw new Error(Errors.UNAUTHORIZED.message);

    const { page, recordPerPage } = req.query;
    await CarparkingTicketInfoService.searchTicketsForUser(idUser, page, recordPerPage)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const detailTicket = async (req, resp) => {
    const { idUser } = req.tokenDecode;
    if(!idUser) throw new Error(Errors.UNAUTHORIZED.message);

    const { id } = req.params;
    await CarparkingTicketInfoService.detailTicketForUser(id, idUser)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const cancelTicket = async (req, resp) => {
    const { idUser } = req.tokenDecode;
    if(!idUser) throw new Error(Errors.UNAUTHORIZED.message);

    const { id } = req.params;
    await CarparkingTicketInfoService.cancelTicket(id, idUser)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const returnTicket = async (req, resp) => {
    const { idUser } = req.tokenDecode;
    if(!idUser) throw new Error(Errors.UNAUTHORIZED.message);

    const { id } = req.params;
    await CarparkingTicketInfoService.returnTicket(id, idUser)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const reportController = async (req, resp) => {
    const { idUser } = req.tokenDecode;
    if(!idUser) throw new Error(Errors.UNAUTHORIZED.message);

    const { year } = req.params;
    if(!year) throw new Error(Errors.PARAM_YEAR_CAN_BE_NOT_NULL.message);

    await CarparkingTicketInfoService.reportForUser(idUser, year)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

module.exports = { bookTicket, searchTickets, detailTicket, cancelTicket, returnTicket, reportController }