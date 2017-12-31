import * as express from "express";
import {PeopleController} from '../controllers/people-controller';
import { Application } from "express";


export class main{
    app:Application;
    port=5998;
    constructor(){
        this.app=express();
        new PeopleController(this.app,'/people');
        this.app.listen(this.port,(error:any)=>{
            if (error){
                console.log('Ecounter problem =>',error);
            }
            console.log(`API Server listening on ${this.port}`);
        });
    }

}

export default  new main();
