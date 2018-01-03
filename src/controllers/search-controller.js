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
        this.create = function (req, resp) {
            var searchparam = req.body;
            //console.log(searchparam);
            var peoples = [];
            if (searchparam.male)
                peoples = _this.peoplecontroller.getfactory().filter(function (people) { return people.name.search(searchparam.name) != -1 && people.gender == 'M'; });
            else if (searchparam.female)
                peoples = _this.peoplecontroller.getfactory().filter(function (people) { return people.name.search(searchparam.name) != -1 && people.gender == 'F'; });
            else
                peoples = _this.peoplecontroller.getfactory().filter(function (people) { return people.name.search(searchparam.name) != -1; });
            var results = peoples.map(function (people) {
                return {
                    id: people.id,
                    name: people.name,
                    gender: people.gender,
                    birthplace: exports.returnPlace(_this.placecontroller, people.place_id)
                };
            });
            resp.send(results);
        };
        this.read = function (req, resp) {
        };
        this.update = function () {
        };
        this["delete"] = function () {
        };
        app.post(this.endpoint, body_parser_1.json(), this.create);
    }
    return SearchController;
}());
exports.SearchController = SearchController;
