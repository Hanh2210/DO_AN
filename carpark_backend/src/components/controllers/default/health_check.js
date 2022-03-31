const express = require("express");

const path = "/health-check";
const router = express.Router();

router.get(path, async (req, res) => {
  res.send("ok");
});
const DefaultRouter = { path, router };
module.exports = DefaultRouter;
