const ExpressApp = require("./express");
const http = require("http");

const HttpApp = (function () {
  var instance;

  function createInstance() {
    var object = http.createServer(ExpressApp.getInstance());
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

module.exports = HttpApp;
