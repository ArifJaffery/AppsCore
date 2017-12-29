import {Component,OnInit} from '@angular/core';
import {FormControl,FormBuilder,FormGroup} from '@angular/forms';

@Component({
    selector: 'search',
    templateUrl: './search-component.html'
})
export class  Search extends FormGroup implements OnInit{
    constructor(private fb:FormBuilder){
        super({});
    }    
    ngOnInit(){
    }
}