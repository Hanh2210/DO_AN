const { Router } = require("express");
const { controllerHandler } = require("../../../middleware/error-handler");
const { searchCarpark, detailCarpark } = require("./controller");

const router = Router();

router.get('/carparks', controllerHandler(searchCarpark));
router.get('/carparks/:id', controllerHandler(detailCarpark));

const CarparkRouter = { router };
module.exports = CarparkRouter;