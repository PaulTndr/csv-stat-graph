import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TableDataComponent } from './table-data/table-data.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { DataService } from '../../services/data.service';
import { GraphDataComponent } from './graph-data/graph-data.component';

@Component({
  selector: 'app-analyse',
  standalone: true,
  imports: [
    //Modules
    CommonModule,
    RouterOutlet,
    TableModule,
    TabMenuModule,

    //Components
    TableDataComponent,
    GraphDataComponent
  ],
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent{

  items :MenuItem[] = [
    {
      label:'Data',
      icon:'pi pi-fw pi-book'
    },
    {
      label:'Graphiques',
      icon:'pi pi-fw pi-chart-line'
    }
  ]

  activeItem : MenuItem = this.items[0];

  constructor(
    private readonly dataService : DataService,
    private readonly router: Router
  ){}

  ngOnInit(){
    this.dataService.checkData();
  }

  change(event:MenuItem){
    this.activeItem = event;
  }

  back(){
    this.router.navigate([''])
  }

}
