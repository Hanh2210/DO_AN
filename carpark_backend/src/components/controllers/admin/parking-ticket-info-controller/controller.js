const commonResponse = require("../../../../utils/common-response");
const CarparkingTicketInfoService = require("../../../services/carparking-ticket-info-service");

const searchTickets = async (req, resp) => {
    const { page, recordPerPage } = req.query;
    await CarparkingTicketInfoService.searchTickets(page, recordPerPage)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const detailTicket = async (req, resp) => {
    const { id } = req.params;
    await CarparkingTicketInfoService.detailTicket(id)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const checkTicket = async (req, resp) => {
    const { id } = req.params;
    await CarparkingTicketInfoService.checkTicket(id)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

const rejectTicket = async (req, resp) => {
    const { id } = req.params;
    await CarparkingTicketInfoService.rejectTicket(id)
        .then(rs => rs)
        .then(rs => commonResponse(resp, rs));
}

module.exports = { searchTickets, detailTicket, checkTicket, rejectTicket }