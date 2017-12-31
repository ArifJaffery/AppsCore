"use strict";
exports.__esModule = true;
var PeopleController = /** @class */ (function () {
    function PeopleController(factory) {
        this.factory = factory;
        console.log('No of Peoples=>', factory.length);
    }
    PeopleController.prototype.getfactory = function () {
        return this.factory;
    };
    return PeopleController;
}());
exports.PeopleController = PeopleController;
