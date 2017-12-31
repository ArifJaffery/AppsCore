import {Component,OnInit} from '@angular/core';
import {FormControl,FormBuilder,FormGroup} from '@angular/forms';
import {isearch}  from '../../api';

@Component({
    selector: 'search',
    templateUrl: './search-component.html'
})
export class  Search extends FormGroup implements OnInit{
    searchresults:isearch[];
    
    constructor(private fb:FormBuilder){
        super({});
    }    
    ngOnInit(){
    }
}