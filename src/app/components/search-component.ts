import {Component,OnInit} from '@angular/core';
import {FormControl,FormBuilder,FormGroup,FormArray} from '@angular/forms';
import {isearch,iresults,gendertype,searchtype}  from '../../api';
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
            type:new FormControl('Simple'),
            name:new FormControl(''),
            male:new FormControl(false),
            female:new FormControl(false),
            results:fb.array([]),
            direction:new FormControl('ancestors')
        });
    }    

    ngOnInit(){

    }

    getgender=(gender:string):string=>{
        return gender == 'M'? 'Male': gender=='F'? 'Female':'';
    }

    searchFn(type:searchtype){
        console.log('I am called',this.value);
        this.searchservice.search({
            "type":type,            
            "name":this.get('name').value,
            "male":this.get('male').value,
            "female":this.get('female').value,
            "results":[],
            "direction" : this.get('direction').value
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

    directionClickFn=(formControl:FormControl,value:string)=>{
        formControl.setValue(value);
        
    }

    getdirectionFn=(value:string):boolean=>{
        return this.get('direction').value ==value;
    }

    searchtypetoggleFn=()=>{
        if (this.get('type').value=='Simple')
            this.get('type').setValue('Advance');
        else
            this.get('type').setValue('Simple');       
    }

    searchtitleFn=(type:string):string=>{
        if (type=='Simple')
            return 'Advance';
        else
            return 'Simple';       
    
    }


}