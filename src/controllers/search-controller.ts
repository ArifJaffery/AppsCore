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

    size=10;

    constructor(private app:Application,private endpoint:string,private peoplecontroller:PeopleController,private placecontroller:PlaceController){
        app.post(this.endpoint,json(),this.create);
    }


    getdescendentsFn(person:ipeople,isroot:boolean):ipeople[]{
        const peoples:ipeople[]=this.peoplecontroller.getfactory();
        let results:ipeople[]=[];
        let childrens:ipeople[]=[];
        const gender:string=person.gender;

        if (gender.toLowerCase()=="m"){            
            childrens=peoples.filter(people=>people.father_id==person.id);   
        }else if (gender.toLowerCase()=="f"){            
            childrens=peoples.filter(people=>people.mother_id==person.id);   
        } else
            return [];

        if (isroot && childrens.length==0)
            return [];
        else{            
            let _childrens:ipeople[]=[];
            _childrens=childrens;
           
            childrens.forEach(child=>{                
                _childrens=_childrens.concat( this.getdescendentsFn(child,false));
            })
            return _childrens;            
        }
    }    
    
    getAllDesendentsFn=(peoples:ipeople[]):ipeople[]=>{
        let descendents:ipeople[]=[];              
        peoples.forEach(people=>{
            descendents=descendents.concat(this.getdescendentsFn(people,true));
        })


        return descendents;
    }
    


    getAncestrorsFn(person:ipeople,peoples:ipeople[]):ipeople[]{
      
        if (person.father_id==null && person.mother_id==null)
            return [];
        else {
            const father=peoples.filter(people=>people.id==person.father_id);   
            const mother=peoples.filter(people=>people.id==person.mother_id);   

            return  father.concat(mother)
                        .concat(this.getAncestrorsFn(father[0],peoples))
                        .concat(this.getAncestrorsFn(mother[0],peoples));
            }
    }

    getAllAncestorsFn=(peoples:ipeople[]):ipeople[]=>{
        let ancestors:ipeople[]=[];              
        peoples.forEach(people=>{
            ancestors=ancestors.concat(this.getAncestrorsFn(people,this.peoplecontroller.getfactory()));
        })
        return ancestors;
    }


    create=(req:Request,resp:Response)=>{
        const searchparam:isearch=req.body as isearch;

        let peoples:ipeople[]=[];

        if (searchparam.male)
            peoples=this.peoplecontroller.getfactory().filter(people=>people.name.toLocaleLowerCase().search(searchparam.name.toLocaleLowerCase() )!=-1 && people.gender=='M' ).slice(0,this.size);        
        else if (searchparam.female)
            peoples=this.peoplecontroller.getfactory().filter(people=>people.name.toLocaleLowerCase().search(searchparam.name.toLocaleLowerCase())!=-1 && people.gender=='F' ).slice(0,this.size);                
        else
            peoples=this.peoplecontroller.getfactory().filter(people=>people.name.toLocaleLowerCase().search(searchparam.name.toLocaleLowerCase())!=-1 ).slice(0,this.size);
        
        let ancestors:ipeople[]=[];
        let descendents:ipeople[]=[];
        if (searchparam.type=='Advance'){
            if (searchparam.direction=='ancestors')            
                ancestors=this.getAllAncestorsFn(peoples);                                                              
            else if (searchparam.direction=='descendents')                        
                descendents=this.getAllDesendentsFn(peoples);
        }


        if (searchparam.type=='Simple'){
            const results:iresults[]=peoples.map(people=>{                              
                return {
                    id:people.id,
                    name:people.name,
                    gender:people.gender,
                    birthplace:returnPlace(this.placecontroller,people.place_id)                
                }
            });
            resp.send(results);            
        }else if (searchparam.type=='Advance'){
            if (searchparam.direction=='ancestors'){            
                const results:iresults[]=ancestors.map(people=>{                              
                    return {
                        id:people.id,
                        name:people.name,
                        gender:people.gender,
                        birthplace:returnPlace(this.placecontroller,people.place_id)                
                    }
                });  
                resp.send(results);                     
            } else if (searchparam.direction=='descendents'){
                const results:iresults[]=descendents.map(people=>{                              
                    return {
                        id:people.id,
                        name:people.name,
                        gender:people.gender,
                        birthplace:returnPlace(this.placecontroller,people.place_id)                
                    }
                });  
                resp.send(results);                                     
            }   
        }
    }

    read=(req:Request,resp:Response)=>{

    }
    update=()=>{

    }

    delete=()=>{

    }

}