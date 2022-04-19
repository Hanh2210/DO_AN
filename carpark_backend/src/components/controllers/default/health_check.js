const { Router } = require("express");

const path = "/health-check";
const router = Router();

router.get(path, async (req, res) => {
  res.send("ok");
});

const DefaultRouter = { router };
module.exports = DefaultRouter;
