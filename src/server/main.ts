import * as express from "express";
import {PeopleController} from '../controllers/people-controller';
import {PlaceController} from '../controllers/place-controller';
import {SearchController}  from '../controllers/search-controller';

import { Application } from "express";
import {icrud,ipeople,iplace,imockdata} from '../api';


export class main{
    app:Application;
    port=5998;
    constructor(){
        this.app=express();                       
        const mockdata=require('../server/data_small.json') as imockdata;

        let peoplefactory:ipeople[]=[];
        peoplefactory=mockdata.people;   
        const peoplecontroller=new PeopleController(peoplefactory);

        let placefactory:iplace[]=[];
        placefactory=mockdata.places;
        const placecontroller=new PlaceController(placefactory);

        //new SearchController(this.app,'/search?:name',peoplecontroller,placecontroller);
        new SearchController(this.app,'/search',peoplecontroller,placecontroller);
        this.app.listen(this.port,(error:any)=>{
            if (error){
                console.log('Ecounter problem =>',error);
            }
            console.log(`API Server listening on ${this.port}`);
        });
    }

}

export default  new main();
