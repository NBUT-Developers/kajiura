/**
 * Ex(frame)ss.js Main file.
 */
require("sugar");
var express = require("express");
var http = require("http");
var path = require("path");
var async = require("async");
var config = require("./config");
var app = express();

async.waterfall([
    /**
     * setp 1:
     *   set express configurations.
     *
     * @param callback
     */
    function(callback) {
        /**
         * environment & error handler
         */
        if("development" === config.server.environment) {
            app.use(express.errorHandler());
        }

        app.set("port", config.server.port);
        app.set("views", __dirname + "/template");
        app.set("view engine", "ejs");

        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());
        app.use(express.bodyParser());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, "/statics")));

        callback();
    },

    /**
     * step 2:
     *   initialize the router.
     *
     * @param callback
     */
    function(callback) {
        config.router.initializeRouter(app, config.logger, callback);
    }
], function(err) {
    if(err) {
        return console.log("An error occurred while initialing the system: " + err.message);
    }

    http.createServer(app).listen(app.get("port"), function() {
        config.logger.info("API Tester server started at 0.0.0.0:" + app.get("port") + ".");
    });
});

