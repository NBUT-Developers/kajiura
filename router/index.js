/**
 * Created by XadillaX on 14-1-22.
 */
var helper = require("../helper");
var indexController = helper.common.getController("index");

exports.post = {
    "/api": indexController.api
};

exports.get = {
    "/"         : indexController.index
};
