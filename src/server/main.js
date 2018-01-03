"use strict";
exports.__esModule = true;
var express = require("express");
var people_controller_1 = require("../controllers/people-controller");
var place_controller_1 = require("../controllers/place-controller");
var search_controller_1 = require("../controllers/search-controller");
var main = /** @class */ (function () {
    function main() {
        var _this = this;
        this.port = 5712;
        this.app = express();
        var mockdata = require('../server/data_small.json');
        var peoplefactory = [];
        peoplefactory = mockdata.people;
        var peoplecontroller = new people_controller_1.PeopleController(peoplefactory);
        var placefactory = [];
        placefactory = mockdata.places;
        var placecontroller = new place_controller_1.PlaceController(placefactory);
        //new SearchController(this.app,'/search?:name',peoplecontroller,placecontroller);
        new search_controller_1.SearchController(this.app, '/search', peoplecontroller, placecontroller);
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
