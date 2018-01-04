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
        this.size = 10;
        this.getAllDesendentsFn = function (peoples) {
            var descendents = [];
            peoples.forEach(function (people) {
                descendents = descendents.concat(_this.getdescendentsFn(people, true));
            });
            return descendents;
        };
        this.getAllAncestorsFn = function (peoples) {
            var ancestors = [];
            peoples.forEach(function (people) {
                ancestors = ancestors.concat(_this.getAncestrorsFn(people, _this.peoplecontroller.getfactory()));
            });
            return ancestors;
        };
        this.create = function (req, resp) {
            var searchparam = req.body;
            var peoples = [];
            if (searchparam.male)
                peoples = _this.peoplecontroller.getfactory().filter(function (people) { return people.name.toLocaleLowerCase().search(searchparam.name.toLocaleLowerCase()) != -1 && people.gender == 'M'; }).slice(0, _this.size);
            else if (searchparam.female)
                peoples = _this.peoplecontroller.getfactory().filter(function (people) { return people.name.toLocaleLowerCase().search(searchparam.name.toLocaleLowerCase()) != -1 && people.gender == 'F'; }).slice(0, _this.size);
            else
                peoples = _this.peoplecontroller.getfactory().filter(function (people) { return people.name.toLocaleLowerCase().search(searchparam.name.toLocaleLowerCase()) != -1; }).slice(0, _this.size);
            var ancestors = [];
            var descendents = [];
            if (searchparam.type == 'Advance') {
                if (searchparam.direction == 'ancestors')
                    ancestors = _this.getAllAncestorsFn(peoples);
                else if (searchparam.direction == 'descendents')
                    descendents = _this.getAllDesendentsFn(peoples);
            }
            if (searchparam.type == 'Simple') {
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
            else if (searchparam.type == 'Advance') {
                if (searchparam.direction == 'ancestors') {
                    var results = ancestors.map(function (people) {
                        return {
                            id: people.id,
                            name: people.name,
                            gender: people.gender,
                            birthplace: exports.returnPlace(_this.placecontroller, people.place_id)
                        };
                    });
                    resp.send(results);
                }
                else if (searchparam.direction == 'descendents') {
                    var results = descendents.map(function (people) {
                        return {
                            id: people.id,
                            name: people.name,
                            gender: people.gender,
                            birthplace: exports.returnPlace(_this.placecontroller, people.place_id)
                        };
                    });
                    resp.send(results);
                }
            }
        };
        this.read = function (req, resp) {
        };
        this.update = function () {
        };
        this["delete"] = function () {
        };
        app.post(this.endpoint, body_parser_1.json(), this.create);
    }
    SearchController.prototype.getdescendentsFn = function (person, isroot) {
        var _this = this;
        var peoples = this.peoplecontroller.getfactory();
        var results = [];
        var childrens = [];
        var gender = person.gender;
        if (gender.toLowerCase() == "m") {
            childrens = peoples.filter(function (people) { return people.father_id == person.id; });
        }
        else if (gender.toLowerCase() == "f") {
            childrens = peoples.filter(function (people) { return people.mother_id == person.id; });
        }
        else
            return [];
        if (isroot && childrens.length == 0)
            return [];
        else {
            var _childrens_1 = [];
            _childrens_1 = childrens;
            childrens.forEach(function (child) {
                _childrens_1 = _childrens_1.concat(_this.getdescendentsFn(child, false));
            });
            return _childrens_1;
        }
    };
    SearchController.prototype.getAncestrorsFn = function (person, peoples) {
        if (person.father_id == null && person.mother_id == null)
            return [];
        else {
            var father = peoples.filter(function (people) { return people.id == person.father_id; });
            var mother = peoples.filter(function (people) { return people.id == person.mother_id; });
            return father.concat(mother)
                .concat(this.getAncestrorsFn(father[0], peoples))
                .concat(this.getAncestrorsFn(mother[0], peoples));
        }
    };
    return SearchController;
}());
exports.SearchController = SearchController;
