import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { FormGroup,FormBuilder, Validators, FormArray } from '@angular/forms';
import { VrekonService } from '../../institute/vrekon.service'
import { IInstitute } from 'src/app/shared/model/institute.model';
import { IInstituteSrvc } from 'src/app/shared/model/instituteSrvc.model';
import { ICompareKey } from 'src/app/shared/model/compareKey.model';
import { ICompareForm, CompareForm } from 'src/app/shared/model/compare.model';
import { ICompareResult } from 'src/app/shared/model/compareResult.model';

import { Router, NavigationExtras} from "@angular/router";
import { ResultData } from '../../providers/result-data';
import { VHelper } from '../../shared/helpers';
@Component({
  selector: 'app-compare-form',
  templateUrl: './compare-form.component.html',
  styleUrls: ['./compare-form.component.scss']
})
export class CompareFormComponent implements OnInit {

  compareFormGroup : FormGroup
  institutes : IInstitute[]
  services1 : IInstituteSrvc[]
  services2 : IInstituteSrvc[]
  
  compareF : ICompareForm

  constructor(
    private fb : FormBuilder,
    private service : VrekonService,
    private router : Router,
    private resultData : ResultData
    ) { }

  ngOnInit() {
    this.compareF= new CompareForm();
    this.prepareNewForm();
    this.loadInstitutes();
  }

  loadInstitutes(){
      this.service.getSetupService()
      .pipe(
          filter((mayBeOk: HttpResponse<IInstitute[]>) => mayBeOk.ok),
          map((response: HttpResponse<IInstitute[]>) => response.body)
      )
      .subscribe(
        (res: IInstitute[]) => {
          this.institutes=res["response"][0];
        }, 
        (res: HttpErrorResponse) => this.onError(res)
      );

  }
  
  onError(resp){
    console.log(resp);
  }

  prepareNewForm():void {
    
    this.compareFormGroup = this.fb.group({
      idInstitusiFrom:[""],
      idInstitusiTo:[""],
      idServiceFrom:[""],
      idServiceTo:[""],
      rekonCompareKey: this.fb.array([this.createKey(null)])
    });
  }

  createKey(name) : FormGroup {
    //if(name == "") return null;
    return this.fb.group({
      "keyName":[name,Validators.required]
    });
  }

  gKeys(){
    return this.compareFormGroup.controls.rekonCompareKey as FormArray;
  }

  addMoreKey(){
    
    let kys = this.gKeys();
    kys.push(this.createKey(null));
  }

  submitResult(){
    this.compareF = new CompareForm();
    this.compareF = this.compareFormGroup.value
    
    this.service.compareData(this.compareF).subscribe(
      (res: HttpResponse<ICompareResult>) => this.onCompareSuccess(res), 
      (res: HttpErrorResponse) => this.onCompareError(res)
    );
    //console.log(this.compareF);
  }

  onCompareSuccess(res){
    if(VHelper.responseStatus(res.body)){
      this.resultData.result = res.body.response[0];
      //console.log(this.resultData.result);
      this.router.navigate(["compare-result"]);
    }
    else{
      VHelper.ShowLog(res.body["log"]);
    }
    
  }

  onCompareError(res){
    
    VHelper.ShowHttpError(res);
  }
  removeKey(i){
    let k = this.gKeys();
    if(k.length>1){
      k.removeAt(i);
    }
  }
  trackByFn(index: any, item: any) {
    return index;
  }

  onInstitute1Change(){
    let idInstitusi = this.compareFormGroup.get("idInstitusiFrom").value;
    this.compareFormGroup.get("idServiceFrom").reset(null);
    this.service.findDbServiceByInstitusi(idInstitusi)
    .pipe(
        filter((mayBeOk: HttpResponse<IInstituteSrvc[]>) => mayBeOk.ok),
        map((response: HttpResponse<IInstituteSrvc[]>) => response.body)
    ).subscribe(
      (res: IInstituteSrvc[]) => {
        this.services1 = res["response"][0]; 
      }, 
      (res: HttpErrorResponse) => this.onError(res)
    );
  }
  onInstitute2Change(){
    let idInstitusi = this.compareFormGroup.get("idInstitusiTo").value;
    this.compareFormGroup.get("idServiceTo").reset(null);
    this.service.findDbServiceByInstitusi(idInstitusi)
    .pipe(
        filter((mayBeOk: HttpResponse<IInstituteSrvc[]>) => mayBeOk.ok),
        map((response: HttpResponse<IInstituteSrvc[]>) => response.body)
    ).subscribe(
      (res: IInstituteSrvc[]) => {
        this.services2 = res["response"][0]; 
      }, 
      (res: HttpErrorResponse) => this.onError(res)
    );
  }
  
}
