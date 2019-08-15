import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { VConst } from '../shared/constant';
import { VHelper } from '../shared/helpers';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.scss']
})
export class UpdateServiceComponent implements OnInit {
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
  fileToUpload: File = null

  constructor(
    private fb : FormBuilder,
    private activatedRoute : ActivatedRoute,
    private service : VrekonService
    ) { }

  ngOnInit() {
    this.isNewRecord = true;
    this.isUpdating = false;
    
    this.prepareNewForm();
    this.activatedRoute.data.subscribe(({ dbService,institutes,idInstitute }) => {

      this.dbService = new DbSrvc();

      if(dbService == null){
        this.institute = institutes["response"][0].find(x => x.id == idInstitute)
        //this.institute = institute;
        this.dbService.dbSetting = new InstituteSrvc();
        this.dbService.dbSetting.idInstitusi = this.institute.id;  
        
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
  get dbTypeOption(){
    return VConst.DBTYPE;
  }
  get serviceStatusOption(){
    return VConst.SERVICE_STATUS;
  }
  prepareNewForm():void {
    
    this.dbServiceForm = this.fb.group({
      id:[""],
      idInstitusi:[""],
      dbType:["DB",[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      dbHost:["a",Validators.required],
      dbName:["a",Validators.required],
      dbUsername:["a",Validators.required],
      dbPassword:["a",Validators.required],
      dbTableName:["a",Validators.required],
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  checkFileName() : string{
    if(this.fileToUpload !==null){
      return this.fileToUpload.name;
    }
    else return "Browse";
    
  }
  checkDbType(){
    const dbType = this.dbServiceForm.get("dbType").value;
    if(dbType === "text" || dbType === "excel"){
      return true;
    }
    return false;
  }
  
  onDbTypeChange(){
    this.fileToUpload = null;
  }
  onSubmit(): void {
    let errCount = this.formValidation(this.dbServiceForm)
    if( errCount == 0 ){
      this.isUpdating = true;
      this.dbService.dbSetting = this.dbServiceForm.value;
      this.dbService.dbSetting.idInstitusi = this.institute.id;
      if(this.isNewRecord){
        this.service.createDbService(this.dbService,this.fileToUpload)
        .subscribe(
            (res: HttpResponse<IDbSrvc>) => this.onUpdateServiceSuccess(res), 
            (res: HttpErrorResponse) => this.onUpdateServiceError(res)
        );
      }
      else{
        this.service.updateDbService(this.dbService)
        .subscribe(
            (res: HttpResponse<IDbSrvc>) => this.onUpdateServiceSuccess(res), 
            (res: HttpErrorResponse) => this.onUpdateServiceError(res)
        );
      }
      
    }
    else{
      //console.log("err",errCount)
    }
  }

  onUpdateServiceSuccess(res: HttpResponse<IDbSrvc>){
    if(VHelper.responseStatus(res.body)){
      this.previousState();
    }
    else{
      alert(res.body['status']);
    }
    
  }
  onUpdateServiceError(res){
    
    VHelper.ShowHttpError(res);
    this.isUpdating=false
  }
}
