import {ipeople} from '../api';

export class PeopleController {

    constructor(private factory:ipeople[]){
        console.log('No of Peoples=>',factory.length);

    }
    getfactory():ipeople[]{
        return this.factory;
    }

}