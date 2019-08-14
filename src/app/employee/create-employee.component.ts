import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  validationMsg = {
    'fullName':{
      'required': ' Full name is required',
      'minlength': 'Full name must be greater than 2',
      'maxlength': 'Full name must be less than 10',
      
    },
    'email':{
      'required': " Email is required"
    },
    'phone':{
      'required': " Phone is required"
    },
  }

  formErrors = {
    'fullName':"",
    'email':"", 
    'phone':"",
  }
  employeeForm : FormGroup;
  fullNameLength = 0;
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    // this.employeeForm = new FormGroup({
    //   fullName : new FormControl(),
    //   email : new FormControl(),
    //   skills : new FormGroup({
    //     skillName : new FormControl(),
    //     expInYears : new FormControl(),
    //     proficiency : new FormControl(),
    //   })
    // });
    this.employeeForm = this.fb.group({
      fullName:["",[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email:["",Validators.required],
      phone:[""],
      contactPreference:["email"],
      skills:this.fb.group({
        skillName:[""],
        expInYears:[""],
        proficiency:["beginner"],
      })      
    });
    this.employeeForm.get("fullName").valueChanges.subscribe( (value: string) => {
      this.fullNameLength = value.length
    });
    this.employeeForm.valueChanges.subscribe( (data:any) => {
      //console.log(JSON.stringify(value));
      this.logValidationErrors(this.employeeForm);
    })
    this.employeeForm.get('skills').valueChanges.subscribe( (value:any) => {
      //console.log(JSON.stringify(value));
    })
    this.employeeForm.controls.contactPreference.valueChanges.subscribe((value)=>{
      this.onCpChange(value);
    })
  }

  logKeyValuePairs(group: FormGroup): void{
    Object.keys(group.controls).forEach((key: string) => {
     const abstractControl = group.get(key);
     if(abstractControl instanceof FormGroup){
      this.logKeyValuePairs(abstractControl);
      abstractControl.disable();
     }
     else{
      console.log("key:" + key + "value:" + abstractControl.value);
     }
    });
  }
  logValidationErrors(group: FormGroup = this.employeeForm): void{
    Object.keys(group.controls).forEach((key: string) => {
     const abstractControl = group.get(key);
     if(abstractControl instanceof FormGroup){
      this.logValidationErrors(abstractControl);
    
     }
     else{
      
      this.formErrors[key]='';
      if(abstractControl && !abstractControl.valid && ( abstractControl.dirty || abstractControl.touched)){
        const msgs = this.validationMsg[key];
        for( const errorKey in abstractControl.errors){
          if(errorKey){
              this.formErrors[key] += msgs[errorKey] + ' ';
          }
        }
      }
     }
    });
  }
  onSubmit() : void{
    console.log(this.employeeForm);
  }

  onLoad(): void {
    this.employeeForm.setValue({
      fullName:"wani wiradharma",
      email : "wani.wira@outlook.co.id",
      skills : {
        skillName : "angular",
        expInYears : "2",
        proficiency : "beginner",
      }
    })    
  }
  onLoad2():void {
    //this.logKeyValuePairs(this.employeeForm);
    //this.logValidationErrors(this.employeeForm);
    //console.log(this.formErrors);
    // this.employeeForm.patchValue({
    //   fullName:"wani wiradharma",
    //   email : "wani.wira@outlook.co.id",
    //   // skills : {
    //   //   skillName : "angular",
    //   //   expInYears : "2",
    //   //   proficiency : "beginner",
    //   // }
    // })
  }

  onCpChange(value: string):void {
    const phoneControl = this.employeeForm.controls.phone;
    const emailControl = this.employeeForm.controls.email;
    if(value === "phone"){
      phoneControl.setValidators([Validators.required,Validators.minLength(5)]);
    }    
    else{
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity()
  }
}
