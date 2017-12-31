import {Injectable} from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {iresults,isearch} from '../../api';

@Injectable()
export class SearchService {
    endpoint:string='/search';
    constructor(private httpclient:HttpClient){

    }

//    search(searchparams:isearch):Promise<iresults[]>{


  //  }
    

}