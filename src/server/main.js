"use strict";
exports.__esModule = true;
var express = require("express");
var people_controller_1 = require("../controllers/people-controller");
var main = /** @class */ (function () {
    function main() {
        var _this = this;
        this.port = 5998;
        this.app = express();
        new people_controller_1.PeopleController(this.app, '/people');
        this.app.listen(this.port, function (error) {
            if (error) {
                console.log('Ecounter problem =>', error);
            }
            console.log("API Server listening on " + _this.port);
        });
    }
    return main;
}());
exports.main = main;
exports["default"] = new main();
