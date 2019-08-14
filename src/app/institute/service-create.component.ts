import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IInstituteSrvc, InstituteSrvc } from '../shared/model/instituteSrvc.model';
import { IInstitute, Institute } from '../shared/model/institute.model';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VrekonService } from "./vrekon.service";
import { IDbSrvc, DbSrvc } from '../shared/model/dbSrvc.model';
import { IInstituteTranslate, InstituteTranslate } from '../shared/model/InstituteTranslate.model';
import { IdInstituteResolve } from './institute.route';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss']
})
export class ServiceCreateComponent implements OnInit {
  validationMsg = {
    'dbHost':{
      'required': ' Host is required',
    },
    'dbType':{
      'required': " type is required"
    },
    'dbName':{
      'required': " DataBase Name is required"
    },
    'dbUsername':{
      'required': " Username is required"
    },
    'dbPassword':{
      'required': " password is required"
    },
    'dbTableName':{
      'required': " table name is required"
    },
    'status':{
      'required': " status is required"
    },
    
  }

  formErrors = {
    'dbType':"",
    'dbHost':"", 
    'dbName':"", 
    'dbUsername':"", 
    'dbPassword':"", 
    'dbTableName':"",
    'status':""
  }
  isNewRecord : boolean
  isUpdating : boolean
  institute : IInstitute
  dbService : IDbSrvc
  dbServiceForm : FormGroup
  constructor(
    private fb : FormBuilder,
    private activatedRoute : ActivatedRoute,
    private service : VrekonService
    ) { }

  ngOnInit() {
    this.isNewRecord = true;
    this.isUpdating = false;
    this.prepareNewForm();
    this.activatedRoute.data.subscribe(({ dbService,institute }) => {

      this.dbService = new DbSrvc();

      if(dbService == null){
        this.institute = institute;
        this.dbService.dbSetting = new InstituteSrvc();
        this.dbService.dbSetting.idInstitusi = institute.id;  
        
      }
      else{
        this.isNewRecord = false;
        this.dbService.dbSetting = dbService
        this.institute = new Institute();
        this.institute.id = dbService.idInstitusi;
        this.dbServiceForm.setValue(dbService);
        
      }

      this.dbService.dbTranslates = [new InstituteTranslate()];
      
    });
    
  }

  prepareNewForm():void {
    
    this.dbServiceForm = this.fb.group({
      id:[""],
      idInstitusi:[""],
      dbType:["",[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      dbHost:["",Validators.required],
      dbName:["",Validators.required],
      dbUsername:["",Validators.required],
      dbPassword:["",Validators.required],
      dbTableName:["",Validators.required],
      status:["Empty",Validators.required]
    });

    //if used onChangeEvent
    // this.newServiceForm.valueChanges.subscribe( (data:any) => {
    //   this.formValidation(this.newServiceForm);
    // })
  }

  formValidation(group: FormGroup = this.dbServiceForm): any{
    let errCount=0;
    Object.keys(group.controls).forEach((key: string) => {
     const abstractControl = group.get(key);
     if(abstractControl instanceof FormGroup){
      errCount=errCount + this.formValidation(abstractControl);
      
     }
     else{
      this.formErrors[key]='';
      if(
        abstractControl 
        && !abstractControl.valid 
        //&& ( abstractControl.dirty || abstractControl.touched)
        ){
        const msgs = this.validationMsg[key];
        for( const errorKey in abstractControl.errors){
          if(errorKey){
              this.formErrors[key] += msgs[errorKey] + ' ';
              errCount=errCount+1;
          }
        }
      }
     }
     
    });
    return errCount;
  }
  previousState() {
    window.history.back();
  }
  onSubmit(): void {
    this.isUpdating = true;

    let errCount = this.formValidation(this.dbServiceForm)
    if( errCount == 0 ){

      this.dbService.dbSetting = this.dbServiceForm.value;
      this.dbService.dbSetting.idInstitusi = this.institute.id;
      if(this.isNewRecord){
        this.service.createDbService(this.dbService)
        .subscribe(
            (res: HttpResponse<IDbSrvc>) => this.onUpdateServiceSuccess(), 
            (res: HttpErrorResponse) => this.onUpdateServiceError()
        );
      }
      else{
        this.service.updateDbService(this.dbService)
        .subscribe(
            (res: HttpResponse<IDbSrvc>) => this.onUpdateServiceSuccess(), 
            (res: HttpErrorResponse) => this.onUpdateServiceError()
        );
      }
      
    }
    else{
      console.log("err",errCount)
    }
    
    

  }

  onUpdateServiceSuccess(){
    this.previousState();
  }
  onUpdateServiceError(){

  }
}
