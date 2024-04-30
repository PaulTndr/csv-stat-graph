import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DataService } from '../../../services/data.service';
import { CsvData } from '../../../models/CsvData';

@Component({
  selector: 'table-data',
  standalone: true,
  imports: [
    //Modules
    CommonModule,
    RouterOutlet,
    TableModule
  ],
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit {

  data: CsvData;
  selectedData : any[] = [];

  displayHeaders:string[]

  type:string ='vabysmo'

  constructor(private readonly dataService :DataService) { }

  ngOnInit() {
    this.dataService.data.subscribe((data)=>{
      if(data){
        this.data = data;
        this.computeDisplayHeaders(data)
      }
    })
    this.dataService.selectedData.subscribe((selectedData)=>{
      if(selectedData){
        this.selectedData = selectedData.data
      }
    })
  }

  computeDisplayHeaders(data:CsvData){
    this.displayHeaders = [];
    switch(this.type){
      case 'vabysmo':
        this.displayHeaders=['nom', 'prenom', 'sexe', 'age', 'indication', 'injections', 'fluide av', 'fluide ap', 'commentaire']
        break
      default:
        this.displayHeaders=data.headers
    }
  }

  selectionChange(event:any){
    this.dataService.selectionChange(event)
  }

}
