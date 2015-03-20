/**
 * Created by XadillaX on 14-1-28.
 */
var helper = require("../helper");
var Base = require("./base/mongodb");
var util = require("util");
var async = require("async");
var md5 = require("MD5");

var exampleSchema = new Base.Schema({
    example     : { type: String }
});
Base.Mongoose.model("example", exampleSchema);

/**
 * example model
 * @constructor
 */
var ExampleModel = function() {
    Base.Model.call(this);
    this.model = Base.Mongoose.model("example", "example");
};

util.inherits(ExampleModel, Base.Model);

/**
 * insert
 * @param example
 * @param callback
 */
ExampleModel.prototype.insert = function(example, callback) {
    if(undefined === callback) callback = helper.common.emptyFunc;
    var data = {
        example: example
    };

    this.model.create(data, function(err, rows) {
        if(err) {
            callback(err);
        } else {
            callback(null, rows.toJSON());
        }
    });
};

module.exports = ExampleModel;
