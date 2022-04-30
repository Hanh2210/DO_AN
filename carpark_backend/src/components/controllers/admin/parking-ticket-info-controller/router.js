const { Router } = require("express");
const { authMiddleware } = require("../../../../middleware/auth");
const { controllerHandler } = require("../../../../middleware/error-handler");
const { searchTickets, detailTicket, checkTicket, rejectTicket } = require("./controller");

const router = Router();

router.get('/admin/tickets', authMiddleware, controllerHandler(searchTickets));
router.get('/admin/tickets/:id', authMiddleware, controllerHandler(detailTicket));
router.put('/admin/tickets/:id/check', authMiddleware, controllerHandler(checkTicket));
router.put('/admin/tickets/:id/reject', authMiddleware, controllerHandler(rejectTicket));

const TicketForAdminRouter = { router };
module.exports = TicketForAdminRouter;