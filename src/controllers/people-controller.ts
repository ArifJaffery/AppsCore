import * as express from "express";
import {Application,Request,Response} from "express";
import {icrud} from '../api';

export class PeopleController implements icrud{
        
    constructor(private app:Application,private endpoint:string){
        app.get(endpoint,this.read)

    }

    create=(req:Request,resp:Response)=>{

    }

    read=(req:Request,resp:Response)=>{
        resp.send('get api');
    }

    update=(req:Request,resp:Response)=>{

    }

    delete=(req:Request,resp:Response)=>{

    }


}