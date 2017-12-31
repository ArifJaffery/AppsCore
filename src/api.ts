import * as express from "express";
import {Request,Response} from "express";


export interface icrud{
    create:(req:Request,resp:Response)=>(void),
    read:(req:Request,resp:Response)=>(void),
    update:(req:Request,resp:Response)=>(void),
    delete:(req:Request,resp:Response)=>(void)    
}

export interface iplace {
    id:number;
    name:number;
}

export interface ipeople{
    id:number;
    name:number;
    gender:string;
    father_id:number;
    mother_id:number;
    place_id:number;
    level:number;
}
