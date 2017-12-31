import {iplace} from '../api';

export class PlaceController{
    constructor(private factory:iplace[]){
        console.log('No of Places=>',factory.length);

    }
    getfactory():iplace[]{
        return this.factory;
    }
    
}