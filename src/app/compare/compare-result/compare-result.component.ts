import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { ICompareResult, CompareResult } from 'src/app/shared/model/compareResult.model';

import { ResultData } from '../../providers/result-data'
import { SpinnerService } from 'src/app/providers/spinner';
@Component({
  selector: 'app-compare-result',
  templateUrl: './compare-result.component.html',
  styleUrls: ['./compare-result.component.scss']
})
export class CompareResultComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private resultData : ResultData,
    private spinnerService : SpinnerService
    ) { }

  result : ICompareResult;
  resultRekon : any;
  downloadLink: string;

  ngOnInit() {
    this.result = new CompareResult();
    this.resultRekon = [];
    
    if(this.resultData.result != null){
      
       this.result = this.resultData.result;
      if(this.result.resultRekon != []){
        this.resultRekon = Object.assign({}, this.result.resultRekon);
      }
      
      this.downloadLink =  this.result.downloadLink;

     //console.log(this.resultRekon);
      // console.log(this.downloadLink);
    }
    this.spinnerService.hide();
    
  }

  previousState(){
    window.history.back();
  }
  
  keyName(keyName): any{
    return keyName.substring(0, keyName.length - 1);
  }
  
  isEmpty(){
    return (this.resultRekon.length == 0);
  }
  checkKeyRow(rowText,num:number) : boolean{

    if(
      rowText.endsWith(num.toString())
      && ( rowText !== "idService1" )
      && ( rowText !== "idService2" )
      && ( rowText !== "id1" )
      && ( rowText !== "id2" )
      && ( rowText !== "status" )
    ){
      
      return true;
    }
    

    return false;
  }
  getStatusClass(status) : string{
    return (status == 'unmatch' ? 'bg-danger' : '' )
  }
  generateReport(){
    //window.open(this.downloadLink, '_blank')
  }
}
