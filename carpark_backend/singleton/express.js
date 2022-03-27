const express = require("express");

const ExpressApp = (function () {
  var instance;

  function createInstance() {
    var object = express();
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

module.exports = ExpressApp;
