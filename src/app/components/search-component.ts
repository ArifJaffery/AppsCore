import {Component,OnInit} from '@angular/core';
import {FormControl,FormBuilder,FormGroup,FormArray} from '@angular/forms';
import {isearch,iresults,gendertype}  from '../../api';
import  {SearchService}  from '../services/search-service';

export const getformArray=function(fb:FormBuilder,results:iresults[]):FormArray{   
    let formArray:FormArray=fb.array([]);
    results.map(result=>{
        formArray.push(fb.group(result));
    });
    return formArray;
}

@Component({
    selector: 'search',
    templateUrl: './search-component.html'
})
export class  Search extends FormGroup implements OnInit{
    searchresults:isearch[];

    constructor(private fb:FormBuilder,private searchservice:SearchService){
        super({
            name:new FormControl(''),
            male:new FormControl(false),
            female:new FormControl(false),
            results:fb.array([])
        });
    }    

    ngOnInit(){

    }

    getgender(){
        const formValue:isearch=this.value;
        
    }
    searchFn(){
        console.log('I am called');
        this.searchservice.search({
            "name":this.get('name').value,
            "male":this.get('male').value,
            "female":this.get('female').value,
            "results":[]        
        }).then((response)=>{
            const data:iresults[]=response as iresults[];                     
            this.setControl('results',getformArray(this.fb,data));            
        }).catch((error)=>{
            console.log('error=>',error);
        });      
    }

    genderClickFn=(formControl1:FormControl,formControl2:FormControl)=>{
        if (!formControl1.value)
           formControl2.setValue(formControl1.value);
    }


}