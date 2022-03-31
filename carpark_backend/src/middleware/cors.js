const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const CorsMiddleware = cors(corsOptions);
module.exports = CorsMiddleware;
