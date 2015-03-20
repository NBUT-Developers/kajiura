/**
 * Created by XadillaX on 14-1-22.
 */
var fJSON = require("fbbk-json");
var Illyria = require("illyria");

exports.index = function(req, resp) {
    resp.render("index");
};

exports.api = function(req, resp) {
    var router = req.param("router") || "";
    var json = req.param("data") || "";
    var connectString = (req.param("conn") || "127.0.0.1:8080").split(":");
    if(connectString.length !== 2) {
        return resp.send({ status: false, msg: "请输入正确的服务端地址和端口。" });
    }

    var illyria = Illyria.createClient(connectString[0], parseInt(connectString[1]));

    illyria.on("error", function(err) {
        illyria.close();
        return resp.send({ status: false, msg: "Illyria 错误：" + err.message });
    });

    illyria.connect(function() {
        try {
            if(!json || typeof json !== "object") {
                json = fJSON.parse(json);
            }
            if(!router) throw new Error("Please give a router.");
            var pos = router.indexOf(".");
            if(-1 === pos) throw new Error("Bad router.");
            router = [ router.substr(0, pos), router.substr(pos + 1) ];
        } catch(e) {
            illyria.close();
            return resp.send({ status: false, msg: e.message });
        }

        illyria.send(router[0], router[1], json, function(err, data) {
            illyria.close();

            if(err) {
                return resp.send({ status: false, msg: err.message });
            }

            return resp.send({ status: true, data: data });
        });
    });
};

