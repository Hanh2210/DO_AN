const { Router } = require("express");
const { authMiddleware } = require("../../../middleware/auth");
const { controllerHandler } = require("../../../middleware/error-handler");
const { getAllVehicles, detailVehicle, addNewVehicle, updateVehicle, deleteVehicle } = require("./controller");

const router = Router();

router.post('/vehicles', authMiddleware , controllerHandler(addNewVehicle));
router.get('/vehicles', authMiddleware , controllerHandler(getAllVehicles));
router.get('/vehicles/:id', authMiddleware, controllerHandler(detailVehicle));
router.put('/vehicles/:id', authMiddleware, controllerHandler(updateVehicle));
router.delete('/vehicles/:id', authMiddleware, controllerHandler(deleteVehicle));


const VehicleForUserRouter = { router };
module.exports = VehicleForUserRouter;