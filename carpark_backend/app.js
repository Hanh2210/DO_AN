const ExpressApp = require("./singleton/express");
const CorsMiddleware = require("./middleware/cors");
const BodyParser = require("body-parser");
const express = require("express");
const RouterApp = require("./components/rest/router");
const path = require("path");
const HttpApp = require("./singleton/http");
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

// expressApp.use("/", (req, resp) => {
//   resp.send("Đồ án");
// });
for (const router of RouterApp) {
  expressApp.use(router.path, router.router);
}

expressApp.use("/static", express.static(path.join(__dirname, "./statics")));

// expressApp.use(errorHandler);

httpApp.listen(process.env.APP_PORT, () => {
  console.log(`server is running at http://localhost:${process.env.APP_PORT}`);
});
