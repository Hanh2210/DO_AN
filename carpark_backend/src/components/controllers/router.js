const CarparkForAdminRouter = require("./admin/carpark-controller/router");
const CarparkRouter = require("./carpark-controller/router");
const DefaultRouter = require("./default/health_check");
const UserRouter = require("./user-controller/router");

const RouterApp = [DefaultRouter, UserRouter, CarparkForAdminRouter, CarparkRouter];

module.exports = RouterApp;
