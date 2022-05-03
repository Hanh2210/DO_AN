const { Router } = require("express");
const { authMiddleware } = require("../../../middleware/auth");
const { controllerHandler } = require("../../../middleware/error-handler");
const { bookTicket, searchTickets, detailTicket, cancelTicket, returnTicket } = require("./controller");

const router = Router();

router.get('/tickets', authMiddleware, controllerHandler(searchTickets));
router.get('/tickets/:id', authMiddleware, controllerHandler(detailTicket));
router.post('/tickets', authMiddleware, controllerHandler(bookTicket));
router.put('/tickets/:id/cancel', authMiddleware, controllerHandler(cancelTicket));
router.put('/tickets/:id/return', authMiddleware, controllerHandler(returnTicket));

const TicketRouter = { router };
module.exports = TicketRouter;