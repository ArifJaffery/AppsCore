"use strict";
exports.__esModule = true;
var body_parser_1 = require("body-parser");
var SearchController = /** @class */ (function () {
    function SearchController(app, endpoint, peoplecontroller, placecontroller) {
        var _this = this;
        this.app = app;
        this.endpoint = endpoint;
        this.peoplecontroller = peoplecontroller;
        this.placecontroller = placecontroller;
        this.create = function () {
        };
        this.read = function (req, resp) {
            console.log('Request Params=>', req.query.name);
            var name = req.query.name;
            if (name != undefined) {
                var peoples = _this.peoplecontroller.getfactory();
                resp.send(peoples.filter(function (people) { return people.name == name; }));
            }
        };
        this.update = function () {
        };
        this["delete"] = function () {
        };
        app.get(this.endpoint, body_parser_1.json(), this.read);
    }
    return SearchController;
}());
exports.SearchController = SearchController;
