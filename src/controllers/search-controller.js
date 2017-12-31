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
            console.log(req.body);
            var searchparam = req.body;
            var peoples = _this.peoplecontroller.getfactory().filter(function (people) { return people.name == searchparam.name; });
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
            /*
                    console.log('Request Params=>',req.query.name);
                    const name:string|undefined=req.query.name;
            
                    if (name!=undefined){
                        
                        const peoples:ipeople[]=this.peoplecontroller.getfactory().filter(people=>people.name==name);
                        const results:iresults[]=peoples.map(people=>{
                            return {
                                id:people.id,
                                name:people.name,
                                gender:people.gender,
                                birthplace:returnPlace(this.placecontroller,people.place_id)
                            }
                        });
                        resp.send(results);
                    }*/
        };
        this.update = function () {
        };
        this["delete"] = function () {
        };
        //    app.get(this.endpoint,json(),this.read);
        app.post(this.endpoint, body_parser_1.json(), this.create);
    }
    return SearchController;
}());
exports.SearchController = SearchController;
