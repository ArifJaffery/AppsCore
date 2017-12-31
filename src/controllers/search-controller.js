"use strict";
exports.__esModule = true;
var body_parser_1 = require("body-parser");
exports.returnPlace = function (placecontroller, placeId) {
    var placename = '';
    placecontroller.getfactory().forEach(function (place) {
        if (place.id == placeId)
            placename = place.name;
    });
    return placename;
};
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
                var peoples = _this.peoplecontroller.getfactory().filter(function (people) { return people.name == name; });
                var results = peoples.map(function (people) {
                    return {
                        id: people.id,
                        name: people.name,
                        gender: people.gender,
                        birthplace: exports.returnPlace(_this.placecontroller, people.place_id)
                    };
                });
                resp.send(results);
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
