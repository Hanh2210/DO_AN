const { Router } = require("express");
const { authMiddleware } = require("../../../../middleware/auth");
const { controllerHandler } = require("../../../../middleware/error-handler");
const { searchUser, detailUser } = require("./controller");

const router = Router();

router.get('/admin/users', authMiddleware, controllerHandler(searchUser));
router.get('/admin/users/:id', authMiddleware, controllerHandler(detailUser));

const UserForAdminRouter = { router };
module.exports = UserForAdminRouter;