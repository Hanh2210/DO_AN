const { Router } = require("express");
const { authMiddleware } = require("../../../../middleware/auth");
const { controllerHandler } = require("../../../../middleware/error-handler");
const { updateCarpark, addNewCarpark, searchCarpark, deleteCarpark, detailCarpark } = require("./controller");

const router = Router();

router.post('/admin/carparks', authMiddleware, controllerHandler(addNewCarpark));
router.get('/admin/carparks', authMiddleware, controllerHandler(searchCarpark));
router.get('/admin/carparks/:id', authMiddleware, controllerHandler(detailCarpark));
router.put('/admin/carparks/:id', authMiddleware, controllerHandler(updateCarpark));
router.delete('/admin/carparks/:id', authMiddleware, controllerHandler(deleteCarpark));

const CarparkForAdminRouter = { router };
module.exports = CarparkForAdminRouter;