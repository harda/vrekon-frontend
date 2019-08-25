import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from "@angular/router";
import { ICompareResult, CompareResult } from 'src/app/shared/model/compareResult.model';

import { ResultData } from '../../providers/result-data'
@Component({
  selector: 'app-compare-result',
  templateUrl: './compare-result.component.html',
  styleUrls: ['./compare-result.component.scss']
})
export class CompareResultComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private resultData : ResultData
    ) { }

  result : ICompareResult;
  resultRekon : any;
  downloadLink: string;
  ngOnInit() {
    this.result = new CompareResult();
    if(!this.isEmpty()){
      
      this.result = this.resultData.result;
      this.resultRekon = Object.assign({}, this.result.resultRekon);
      this.downloadLink =  this.result.downloadLink;

      console.log(this.resultRekon);
      console.log(this.downloadLink);
      this.keyCleaner();
    }
    
    //this.resultData.result = null;
    //console.log(this.result);

  }

  previousState(){
    window.history.back();
  }
  
  keyCleaner(){
    console.log(this.resultRekon);
    if(!this.isEmpty()){

        delete this.resultRekon[0]["id1"];
        delete this.resultRekon[0]["id2"];
        delete this.resultRekon[0]["idService1"];
        delete this.resultRekon[0]["idService2"];

    }
  }
  keyName(keyName): any{
    return keyName.substring(0, keyName.length - 1);
  }
  
  isEmpty(){
    return (this.resultData.result == null);
  }

  generateReport(){
    //window.open(this.downloadLink, '_blank')
  }
}
