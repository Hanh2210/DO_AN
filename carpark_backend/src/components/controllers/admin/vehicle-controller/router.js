const { Router } = require("express");
const { authMiddleware } = require("../../../../middleware/auth");
const { controllerHandler } = require("../../../../middleware/error-handler");
const { searchVehicle, detailVehicle } = require("./controller");

const router = Router();

router.get('/admin/vehicles', authMiddleware, controllerHandler(searchVehicle));
router.get('/admin/vehicles/:id', authMiddleware, controllerHandler(detailVehicle));

const VehicleForAdminRouter = { router };
module.exports = VehicleForAdminRouter;