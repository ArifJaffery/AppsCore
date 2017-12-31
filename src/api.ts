import * as express from "express";
import {Request,Response} from "express";


export interface imockdata{
    places:iplace[],
    people:ipeople[]
}

export interface icrud{
    create:(req:Request,resp:Response)=>(void),
    read:(req:Request,resp:Response)=>(void),
    update:(req:Request,resp:Response)=>(void),
    delete:(req:Request,resp:Response)=>(void)    
}

export interface iplace {
    id:number;
    name:string;
}

export interface ipeople{
    id:number;
    name:string;
    gender:gendertype;
    father_id:number;
    mother_id:number;
    place_id:number;
    level:number;
}


export type gendertype='Male' | 'Female';

export interface iresults{
    id:number;
    name:string;
    gender:gendertype;
    birthplace:string;
}

export interface isearch {    
    name:string;
    gender:gendertype;
    results:iresults[]
}

