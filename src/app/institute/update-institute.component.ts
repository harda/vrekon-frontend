import { Component, OnInit } from '@angular/core';
import { VrekonService } from "./vrekon.service";
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IInstitute, Institute } from '../shared/model/institute.model';
import { IInstituteSrvc, InstituteSrvc } from '../shared/model/instituteSrvc.model';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { VHelper } from '../shared/helpers';
@Component({
  selector: 'app-update-institute',
  templateUrl: './update-institute.component.html',
  styleUrls: ['./update-institute.component.scss']
})
export class UpdateInstituteComponent implements OnInit {
  isUpdating : boolean
  instituteForm : FormGroup;
  institute : IInstitute
  constructor(
    private service: VrekonService,
    private fb : FormBuilder,
    private activatedRoute : ActivatedRoute
    ) { }


  previousState() {
    window.history.back();
  }

  ngOnInit() {
    this.isUpdating=false;
    this.prepareNewForm();

    this.activatedRoute.data.subscribe(({ idInstitute,institutes}) => {
      this.institute = institutes["response"][0].find(x => x.id == idInstitute)
      this.instituteForm.patchValue(this.institute);
    });
  }
  prepareNewForm():void {
    
    this.instituteForm = this.fb.group({
      id:[""],
      institusiTabel:["",[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      name:["",Validators.required],
    });
  }

  updateInstitute(){
    
    this.isUpdating = true;
    let newInstitute = new Institute();

    //newInstitute.name = this.newInstituteForm.controls.institusiName.value;
    //newInstitute.institusiTable = this.newInstituteForm.controls.institusiTable.value;
    console.log(this.instituteForm.value);
    this.institute = this.instituteForm.value;
    console.log(this.institute);
    
    this.service.updateInstitute(this.institute)
    .subscribe(
      (res: HttpResponse<IInstitute>) => this.onUpdateInstituteSuccess(res), 
      (res: HttpErrorResponse) => this.onUpdateInstituteError(res)
    );
  }
  protected onUpdateInstituteSuccess(res) {
    this.isUpdating = false;
    if(VHelper.responseStatus(res.body)){
      this.previousState();
    }
    else{
      console.log(res.body);
      VHelper.ShowLog(res.body["log"]);
    }

    
  }
  protected onUpdateInstituteError(res: HttpErrorResponse) {
      this.isUpdating = false;
      VHelper.ShowHttpError(res);
      //this.newInstituteForm.controls.institusiName.value="";

  }
}
