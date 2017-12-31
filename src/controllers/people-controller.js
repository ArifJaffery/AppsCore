"use strict";
exports.__esModule = true;
var PeopleController = /** @class */ (function () {
    function PeopleController(app, endpoint) {
        this.app = app;
        this.endpoint = endpoint;
        this.create = function (req, resp) {
        };
        this.read = function (req, resp) {
            resp.send('get api');
        };
        this.update = function (req, resp) {
        };
        this["delete"] = function (req, resp) {
        };
        app.get(endpoint, this.read);
    }
    return PeopleController;
}());
exports.PeopleController = PeopleController;
