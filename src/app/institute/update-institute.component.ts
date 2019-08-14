import { Component, OnInit } from '@angular/core';
import { VrekonService } from "./vrekon.service";
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IInstitute, Institute } from '../shared/model/institute.model';
import { IInstituteSrvc, InstituteSrvc } from '../shared/model/instituteSrvc.model';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';

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

  ngOnInit() {
    this.isUpdating=false;
    this.prepareNewForm();

    this.activatedRoute.data.subscribe(({ institute }) => {
      this.institute = institute;
      console.log(institute);
      this.instituteForm.setValue(this.institute);
    });
  }
  prepareNewForm():void {
    
    this.instituteForm = this.fb.group({
      id:[""],
      institusiTable:["",[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
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
      (res: HttpResponse<IInstitute>) => this.onUpdateInstituteSuccess(), 
      (res: HttpErrorResponse) => this.onUpdateInstituteError(res)
    );
  }
  protected onUpdateInstituteSuccess() {
    this.isUpdating = false;
    this.previousState();
    
  }
  previousState() {
    window.history.back();
  }
  protected onUpdateInstituteError(res) {
      this.isUpdating = false;
      console.log(res);
      //this.newInstituteForm.controls.institusiName.value="";

  }
}
