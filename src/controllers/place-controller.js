"use strict";
exports.__esModule = true;
var PlaceController = /** @class */ (function () {
    function PlaceController(factory) {
        this.factory = factory;
        console.log('No of Places=>', factory.length);
    }
    PlaceController.prototype.getfactory = function () {
        return this.factory;
    };
    return PlaceController;
}());
exports.PlaceController = PlaceController;
