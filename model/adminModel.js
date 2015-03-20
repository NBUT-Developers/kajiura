/**
 * Created by XadillaX on 14-1-28.
 */
var helper = require("../helper");
var Base = require("./base");
var util = require("util");
var async = require("async");
var md5 = require("MD5");

var adminSchema = new Base.Schema({
    username    : { type: String, unique: true },
    password    : { type: String },

    logintime   : { type: Number },
    loginip     : { type: String },

    email       : { type: String }
});
Base.Mongoose.model("admin", adminSchema);

/**
 * administrator model
 * @constructor
 */
var AdminModel = function() {
    Base.Model.call(this);
    this.model = Base.Mongoose.model("admin", "admin");
};

util.inherits(AdminModel, Base.Model);

/**
 * update login.
 * @param _id
 * @param ip
 * @param [callback]
 */
AdminModel.prototype.updateLogin = function(_id, ip, callback) {
    if(undefined === callback) callback = helper.common.emptyFunc;
    var data = {
        logintime   : helper.common.timestamp(),
        ip          : ip
    };

    // update.
    this.model.findByIdAndUpdate(_id, data, function(err, doc) {
        if(err) {
            callback(err);
        } else if(doc === undefined || doc === null || doc.length === 0 || !doc) {
            callback(new Error("不存在的用户。"));
        } else {
            callback(null, doc.toJSON());
        }
    });
};

/**
 * verify login
 * @param username
 * @param password
 * @param callback
 */
AdminModel.prototype.verifyLogin = function(username, password, callback) {
    if(undefined === callback) callback = helper.common.emptyFunc;
    var condition = {
        username: username,
        password: md5(password)
    };

    // find the administrator
    this.model.findOne(condition, function(err, doc) {
        if(err) {
            callback(err);
        } else if(doc === undefined || doc === null || doc.length === 0 || !doc) {
            callback(new Error("用户名或者密码错误。"));
        } else {
            callback(null, doc.toJSON());
        }
    });
};

module.exports = AdminModel;
