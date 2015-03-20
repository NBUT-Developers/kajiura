/**
 * Created by XadillaX on 14-1-22.
 */
var server = require("./server");
var router = require("./router");
var logger = require("./log4js")(server.environment);
var renderData = require("./renderData");

module.exports = {
    server      : server,
    router      : router,
    logger      : logger,
    renderData  : renderData
};
