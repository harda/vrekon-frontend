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

  result : any;
  keys : any;
  ngOnInit() {
    this.result = new CompareResult();
    if(!this.isEmpty()){
      this.result = this.resultData.result[0];
      this.keys = Object.assign({}, this.result);
      this.keyCleaner();
    }
    
    //this.resultData.result = null;
    console.log(this.result);

  }

  previousState(){
    window.history.back();
  }
  
  keyCleaner(){
    delete this.keys["name1"];
    delete this.keys["name2"];
    delete this.keys["id1"];
    delete this.keys["id2"];
    delete this.keys["idInstitusi1"];
    delete this.keys["idInstitusi2"];
  }
  keyName(keyName): any{
    return keyName.substring(0, keyName.length - 1);
  }
  
  isEmpty(){
    return (this.resultData.result == null);
  }

}
