import * as express from "express";
import { Application,Request,Response } from "express";
import {json} from "body-parser";


import {icrud, ipeople,iresults,gendertype, isearch} from '../api';
import {PeopleController}  from '../controllers/people-controller';
import {PlaceController} from '../controllers/place-controller';

export const returnPlace=function(placecontroller:PlaceController,placeId:number):string{
    let placename:string='';

    placecontroller.getfactory().forEach(place => {
        if (place.id==placeId)
        placename=place.name;
    });

    return placename;
}


export class SearchController implements icrud {

    constructor(private app:Application,private endpoint:string,private peoplecontroller:PeopleController,private placecontroller:PlaceController){
        app.post(this.endpoint,json(),this.create);
    }

    create=(req:Request,resp:Response)=>{
        console.log(req.body);
        const searchparam:isearch=req.body as isearch;
        const peoples:ipeople[]=this.peoplecontroller.getfactory().filter(people=>people.name==searchparam.name);
        const results:iresults[]=peoples.map(people=>{                                
            return {
                id:people.id,
                name:people.name,
                gender:people.gender,
                birthplace:returnPlace(this.placecontroller,people.place_id)                
            }
        });
        resp.send(results);            

    }

    read=(req:Request,resp:Response)=>{

    }
    update=()=>{

    }

    delete=()=>{

    }

}