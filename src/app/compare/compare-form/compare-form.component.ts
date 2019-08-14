import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { FormGroup,FormBuilder, Validators, FormArray } from '@angular/forms';
import { VrekonService } from '../../institute/vrekon.service'
import { IInstitute } from 'src/app/shared/model/institute.model';
import { ICompareKey } from 'src/app/shared/model/compareKey.model';
import { ICompareForm, CompareForm } from 'src/app/shared/model/compare.model';
import { ICompareResult } from 'src/app/shared/model/compareResult.model';

import { Router, NavigationExtras} from "@angular/router";
import { ResultData } from '../../providers/result-data'
@Component({
  selector: 'app-compare-form',
  templateUrl: './compare-form.component.html',
  styleUrls: ['./compare-form.component.scss']
})
export class CompareFormComponent implements OnInit {

  compareFormGroup : FormGroup
  institutes : IInstitute[]
  compareF : ICompareForm
  //keys : ICompareKey[]

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
      rekonCompareKey: this.fb.array([this.createKey("REF")])
    });
  }

  createKey(name) : FormGroup {
    //if(name == "") return null;
    return this.fb.group({
      "keyName":[name,Validators.required]
    });
  }

  getKeys(){
    return this.compareFormGroup.get("rekonCompareKey") as FormArray;
  }

  addMoreKey(){
    
    let kys = this.getKeys();
    kys.push(this.createKey(null));
  }

  submitResult(){
    this.compareF = new CompareForm();
    this.compareF = this.compareFormGroup.value
    this.service.compareData(this.compareF).subscribe(
      (res: HttpResponse<ICompareResult>) => this.onCompareSuccess(res.body), 
      (res: HttpErrorResponse) => this.onCompareError(res)
    );
    //console.log(this.compareF);
  }

  onCompareSuccess(res){
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //       "result": res,
    //   }
    // };
    // this.router.navigate(["compare-result"], navigationExtras);
    this.resultData.result = res;
    this.router.navigate(["compare-result"]);
  }

  onCompareError(res){
    console.log(res)
  }
  removeKey(i){
    console.log(i)
    let kys = this.getKeys();
    kys.removeAt(i);
  }
}
