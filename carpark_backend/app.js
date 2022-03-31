const ExpressApp = require("./src/singleton/express");
const CorsMiddleware = require("./src/middleware/cors");
const BodyParser = require("body-parser");
const express = require("express");
const RouterApp = require("./src/components/controllers/router");
const path = require("path");
const HttpApp = require("./src/singleton/http");
const { errorHandler } = require("./src/middleware/error-handler");
const Errors = require("./src/constants/error-contanst");
require("dotenv").config();

const expressApp = ExpressApp.getInstance();
const httpApp = HttpApp.getInstance();

expressApp.use(CorsMiddleware);
expressApp.use(BodyParser.json({ limit: "50mb" }));
expressApp.use(
  BodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 50000,
  })
);

for (const router of RouterApp) {
  expressApp.use(router.router);
}

expressApp.use("/static", express.static(path.join(__dirname, "./statics")));

expressApp.use(errorHandler);
expressApp.use((req, resp, next) => {
  resp.status(404).json(Errors.NOT_FOUND);
});

httpApp.listen(process.env.APP_PORT, () => {
  console.log(`server is running at http://localhost:${process.env.APP_PORT}`);
});
