import * as express from "express";
import { Application,Request,Response } from "express";
import {json} from "body-parser";


import {icrud, ipeople} from '../api';
import {PeopleController}  from '../controllers/people-controller';
import {PlaceController} from '../controllers/place-controller';



export class SearchController implements icrud {

    constructor(private app:Application,private endpoint:string,private peoplecontroller:PeopleController,private placecontroller:PlaceController){
            app.get(this.endpoint,json(),this.read);
    }

    create=()=>{

    }

    read=(req:Request,resp:Response)=>{

        console.log('Request Params=>',req.query.name);
        const name:string|undefined=req.query.name;
    

        if (name!=undefined){
            const peoples:ipeople[]=this.peoplecontroller.getfactory();
            resp.send(peoples.filter(people=>people.name==name));
        }
    }
    update=()=>{

    }

    delete=()=>{

    }

}