const { Router } = require("express");
const { authMiddleware } = require("../../../middleware/auth");
const { controllerHandler } = require("../../../middleware/error-handler");
const { registerController, loginController, editUserController, getUserDetail } = require("./controller");

const router = Router()

router.post('/register', controllerHandler(registerController));
router.post('/login', controllerHandler(loginController));
router.put('/edit-user', authMiddleware, controllerHandler(editUserController));
router.get('/user-detail', authMiddleware, controllerHandler(getUserDetail));

const UserRouter = { router };
module.exports = UserRouter;