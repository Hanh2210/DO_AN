const DefaultRouter = require("./default/health_check");
const UserRouter = require("./user-controller/router");

const RouterApp = [DefaultRouter, UserRouter];

module.exports = RouterApp;
