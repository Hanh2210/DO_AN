const CarparkForAdminRouter = require("./admin/carpark-controller/router");
const UserForAdminRouter = require("./admin/user-controller/router");
const VehicleForAdminRouter = require("./admin/vehicle-controller/router");
const CarparkRouter = require("./carpark-controller/router");
const DefaultRouter = require("./default/health_check");
const UserRouter = require("./user-controller/router");
const VehicleForUserRouter = require("./vehicle-controller/router");

const RouterApp = [DefaultRouter, UserForAdminRouter, UserRouter, CarparkForAdminRouter, CarparkRouter,
    VehicleForUserRouter, VehicleForAdminRouter];

module.exports = RouterApp;
