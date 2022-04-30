const CarparkForAdminRouter = require("./admin/carpark-controller/router");
const TicketForAdminRouter = require("./admin/parking-ticket-info-controller/router");
const UserForAdminRouter = require("./admin/user-controller/router");
const VehicleForAdminRouter = require("./admin/vehicle-controller/router");
const CarparkRouter = require("./carpark-controller/router");
const DefaultRouter = require("./default/health_check");
const TicketRouter = require("./parking-ticket-info-controller/router");
const UserRouter = require("./user-controller/router");
const VehicleForUserRouter = require("./vehicle-controller/router");

const RouterApp = [DefaultRouter, UserForAdminRouter, UserRouter, CarparkForAdminRouter, CarparkRouter,
    VehicleForUserRouter, VehicleForAdminRouter, TicketForAdminRouter, TicketRouter ];

module.exports = RouterApp;
