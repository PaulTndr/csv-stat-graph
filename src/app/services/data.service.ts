import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CsvData } from '../models/CsvData';
import { Router } from '@angular/router';
import { ParserService } from './parser.service';
import { AnalyseService } from './analyse.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  type:string='vabysmo';
  loaded = false;
  data: BehaviorSubject<CsvData> = new BehaviorSubject<CsvData>(null);
  selectedData: BehaviorSubject<CsvData> = new BehaviorSubject<CsvData>(null);
  graphDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private readonly router: Router,
    private readonly parserService : ParserService,
    private readonly analyseService : AnalyseService
  ) { }

  async parseCSV(file: File){
    if(file){
      this.data.next(await this.parserService.parseCSV(file, this.type));
      this.selectedData.next(this.data.value);
      this.computeGraphData();
      this.loaded=true;
      this.router.navigate(['analyse'])
    }
  }

  selectionChange(data:any){
    this.selectedData.next({...this.selectedData.value, data:data})
    this.computeGraphData();
  }

  computeGraphData(){
    this.graphDataSubject.next(this.analyseService.computeGraphData(this.selectedData.value, this.type))
  }

  checkData(){
    if(!this.loaded){
      this.router.navigate([''])
    }
  }
}
