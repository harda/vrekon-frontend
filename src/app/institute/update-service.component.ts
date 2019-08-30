import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IInstituteSrvc, InstituteSrvc } from '../shared/model/instituteSrvc.model';
import { IInstitute, Institute } from '../shared/model/institute.model';
import { FormGroup,FormBuilder, Validators, FormArray } from '@angular/forms';
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
        this.dbService.dbSetting = dbService["response"][0];
        //this.dbService.dbTranslates = [null];
        
        this.institute = new Institute();
        this.institute.id = dbService.idInstitusi;
        console.log(this.dbService.dbSetting);
        

        this.gTranslates().clear()
        this.dbService.dbSetting.dbTranslates.forEach(trans => {
          this.gTranslates().push(this.createTranslateForm(trans))
        });
        this.dbServiceForm.setValue(this.dbService.dbSetting);
        
      }

      //this.dbService.dbTranslates = [new InstituteTranslate()];
      
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
      dbType:["",[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      dbHost:[""],
      dbName:[""],
      dbUsername:[""],
      dbPassword:[""],
      dbTableName:[""],
      status:["Empty",Validators.required],
      dbTranslates: this.fb.array([])
    });
    //this.trasnlateForm = this.fb.group({})



    //if used onChangeEvent
    // this.newServiceForm.valueChanges.subscribe( (data:any) => {
    //   this.formValidation(this.newServiceForm);
    // })
  }

  createTranslateForm(trans : IInstituteTranslate){
    if(trans==null){
      return this.fb.group({
        "id":[""],
        "idService":[""],
        "originTableName":["",Validators.required],
        "targetTableName":["",Validators.required]
      });
    }
    else{
      return this.fb.group({
        "id":[trans.id],
        "idService":[trans.idService],
        "originTableName":[trans.originTableName,Validators.required],
        "targetTableName":[trans.targetTableName,Validators.required]
      });
    }
    
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
      return "file";
    }
    if(dbType === "mysql" || dbType === "oracle"){
      return "db";
    }
    return "";
  }
  
  onDbTypeChange(){
    this.fileToUpload
    this.fileToUpload = null;
  }
  onSubmit(): void {
    let errCount = this.formValidation(this.dbServiceForm)
    if( errCount == 0 ){
      this.dbService.dbSetting = this.dbServiceForm.value;
      //console.log(this.dbService.dbSetting.dbTranslates);
      this.dbService.dbSetting.idInstitusi = this.institute.id;
      // if(this.gTranslates().length <= 1){
      //   let tr = this.gTranslates().value[0];

      //   if(tr["originTableName"] === "" && tr["targetTableName"] === "" ){
      //     this.dbService.dbSetting.dbTranslates = [];
      //   }
      //   else{
          
      //   }
      // }
      this.dbService.dbTranslates =  this.dbService.dbSetting.dbTranslates;

      this.isUpdating = true;
      if(this.isNewRecord){
        this.service.createDbService(this.dbService,this.fileToUpload)
        .subscribe(
            (res: HttpResponse<IDbSrvc>) => this.onUpdateServiceSuccess(res), 
            (res: HttpErrorResponse) => this.onUpdateServiceError(res)
        );
      }
      else{
        this.service.updateDbService(this.dbService,this.fileToUpload)
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
      this.isUpdating=false
      VHelper.ShowLog(res.body["log"]);
    }
    
  }
  onUpdateServiceError(res){
    
    VHelper.ShowHttpError(res);
    this.isUpdating=false
  }
  gTranslates(){
    return this.dbServiceForm.get("dbTranslates") as FormArray;
  }

  addMoreTranslate(){
    let t = this.gTranslates();
    t.push(this.createTranslateForm(null));
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  removeTranslateForm(i){
    let t = this.gTranslates();
    //if(t.length>1){
      t.removeAt(i);
    //}
    
  }

  getFileType(){
    const dbType = this.dbServiceForm.get("dbType").value;
    if(dbType === "excel"){
      return " .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";
    }
    if(dbType === "text" ){
      return "text/plain, text/html";
    }
  }
}
