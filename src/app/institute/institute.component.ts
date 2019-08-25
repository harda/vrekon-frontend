import { Component, OnInit } from '@angular/core';
import { VrekonService } from "./vrekon.service";
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { IInstitute, Institute } from '../shared/model/institute.model';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { VHelper } from '../shared/helpers';
import { DbSrvc } from '../shared/model/dbSrvc.model';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent implements OnInit {

  constructor(
    private service: VrekonService,
    private fb : FormBuilder,
    ) { }
  institutes : IInstitute[];
  newInstitute : IInstitute;
  newInstituteForm : FormGroup;
  isUpdating : boolean;
  serviceColor = {
    'Ready':"success",
    'Empty':"danger", 
    'On Progress':"warning",
  }
  ngOnInit() {
    this.isUpdating = false;
    this.institutes = [];
    this.loadInstitutes();
    this.prepareNewForm();
  }

  prepareNewForm():void {
    this.newInstitute = new Institute();
    this.newInstituteForm = this.fb.group({
      institusiTabel:["",[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      name:["",Validators.required],
    });
  }

  loadInstitutes(){
    
    this.service.getSetupService()
    .pipe(
        filter((mayBeOk: HttpResponse<IInstitute[]>) => mayBeOk.ok),
        map((response: HttpResponse<IInstitute[]>) => response.body)
    )
    .subscribe(
      (res: IInstitute[]) => {
        //console.log(res["response"][0]);
        this.institutes = res["response"][0];
      }, 
      (res: HttpErrorResponse) => this.onError(res)
    );

    // this.service.getSetupService()
    // .pipe(
    //   filter((mayBeOk: HttpResponse<IInstitute[]>) => mayBeOk.ok),
    //   map((response: HttpResponse<IInstitute[]>) => response.body)
    // ).subscribe(
    //   (res: IInstitute[]) => (this.institutes = res), 
    //   (res: HttpErrorResponse) => this.onError(res.message)
    // );
  }
  addInstitute(){
    
    this.isUpdating = true;
    let newInstitute = new Institute();

    //newInstitute.name = this.newInstituteForm.controls.institusiName.value;
    //newInstitute.institusiTable = this.newInstituteForm.controls.institusiTable.value;
    newInstitute = this.newInstituteForm.value;
    this.service.createInstitute(newInstitute)
    .subscribe(
      (res: HttpResponse<IInstitute>) => this.onUpdateInstituteSuccess(res), 
      (res: HttpErrorResponse) => this.onUpdateInstituteError(res)
    );
  }
  updateInstitute(id:number){
    
    this.isUpdating = true;
    let newInstitute = new Institute();

    //newInstitute.name = this.newInstituteForm.controls.institusiName.value;
    //newInstitute.institusiTable = this.newInstituteForm.controls.institusiTable.value;
    newInstitute = this.newInstituteForm.value;
    this.service.createInstitute(newInstitute)
    .subscribe(
      (res: HttpResponse<IInstitute>) => this.onUpdateInstituteSuccess(res), 
      (res: HttpErrorResponse) => this.onUpdateInstituteError(res)
    );
  }

  deleteInstitute(id: number){
    this.isUpdating = true;
    this.service.deleteInstitute(id).subscribe(response => {
        this.loadInstitutes();
        this.isUpdating = false;
    });
  }
  deleteService(id: number){
    this.isUpdating = true;
    this.service.deleteDbService(id).subscribe(response => {
        this.loadInstitutes();
        this.isUpdating = false;
    });
  }
  protected onUpdateInstituteSuccess(res) {

    this.isUpdating = false;
    if(VHelper.responseStatus(res.body)){
      this.newInstituteForm.reset();
      this.loadInstitutes();
    }
    else{
      VHelper.ShowLog(res.body["log"]);
    }
    
  }

  protected onUpdateInstituteError(res) {
      this.isUpdating = false;
      VHelper.ShowHttpError(res);
      //this.newInstituteForm.controls.institusiName.value="";

  }

  onError(msg: any){
    console.log("error loading institute");
    console.log(msg);
  }

  dbClearTmpService(idSrvc : number){
    this.isUpdating = true;
    this.service.clearTempDbService(idSrvc).subscribe(
      (res: HttpResponse<any>) => this.onDeleteTempSuccess(res), 
      (res: HttpErrorResponse) => this.onHttpError(res)
    );
  }

  dbCopyStart(idSrvc : number){
    this.isUpdating = true;
    this.service.copyDbService(idSrvc).subscribe(
      (res: HttpResponse<any>) => this.onCopyServiceSuccess(res), 
      (res: HttpErrorResponse) => this.onHttpError(res)
    );
  }

  onCopyServiceSuccess(res){
    this.isUpdating = false;
    if(VHelper.responseStatus(res.body)){
      this.newInstituteForm.reset();
      this.loadInstitutes();
    }
    else{
      console.log(res);
      //VHelper.ShowLog(res.body["log"]);
    }
  }
  onDeleteTempSuccess(res){
    this.isUpdating = false;
    if(VHelper.responseStatus(res.body)){
      this.newInstituteForm.reset();
      this.loadInstitutes();
    }
    else{
      VHelper.ShowLog(res.body["log"]);
    }
  }
  onHttpError(res){
    this.isUpdating = false;
    VHelper.ShowHttpError(res);
  }
}
