import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders}  from '@angular/common/http';
import {iresults,isearch} from '../../api';

@Injectable()
export class SearchService {
    endpoint:string='/search';
    constructor(private httpclient:HttpClient){

    }

    search(searchparams:isearch){  

      return this.httpclient.post(this.endpoint,searchparams).toPromise()
            .then((response)=>{              
              return Promise.resolve(response as iresults[]);
            })
            .catch((error)=>{
              return Promise.reject(error);
            });     
    }
    

}