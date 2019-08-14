import { Component, OnInit } from '@angular/core';
import { VrekonService } from "./vrekon.service";
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { IInstitute, Institute } from '../shared/model/institute.model';
import { IInstituteSrvc, InstituteSrvc } from '../shared/model/instituteSrvc.model';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';

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
      institusiTable:["",[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
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
        this.institutes=res["response"][0];
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
      (res: HttpResponse<IInstitute>) => this.onUpdateInstituteSuccess(), 
      (res: HttpErrorResponse) => this.onUpdateInstituteError()
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
      (res: HttpResponse<IInstitute>) => this.onUpdateInstituteSuccess(), 
      (res: HttpErrorResponse) => this.onUpdateInstituteError()
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
  protected onUpdateInstituteSuccess() {
    this.isUpdating = false;
    this.newInstituteForm.reset();
    this.loadInstitutes();
  }

  protected onUpdateInstituteError() {
      this.isUpdating = false;
      //this.newInstituteForm.controls.institusiName.value="";

  }

  protected paginateData(data: IInstitute[], headers: HttpHeaders) {
      //this.links = this.parseLinks.parse(headers.get('link'));
      //this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
      for (let i = 0; i < data.length; i++) {
          this.institutes.push(data[i]);
      }
  }

  onError(msg: any){
    console.log("error loading institute");
    console.log(msg);
  }

}
