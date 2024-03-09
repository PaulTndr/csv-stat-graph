import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { DataService } from '../../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'graph-data',
  standalone: true,
  imports: [
    //Modules
    CommonModule,
    RouterOutlet,
    FormsModule,
    ChartModule,
    CheckboxModule
  ],
  templateUrl: './graph-data.component.html',
  styleUrls: ['./graph-data.component.scss']
})
export class GraphDataComponent implements OnInit {

  data: any;
  options: any;

  graphData: any;
  graphOptions={
    patients:true,
    average:true
  }

  constructor(private readonly dataService : DataService){}

  ngOnInit() {
    //Get data
    this.dataService.graphDataSubject.subscribe((graphData: any)=>{
      //Graph
      this.graphData=graphData;
      this.visualize()
    });
    
  }

  visualize(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    let labels = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10]
    let datasets = [];
    if(this.graphOptions.patients){
      datasets = this.graphData.patients.map((d:any)=>{
        return {
          label: d.label,
          data: labels.map((l)=>d.intervallesNormalises.find((i:any)=>i.index==l) ? d.intervallesNormalises.find((i:any)=>i.index==l).value : null),
          fill: false,
          borderDash: [5, 5],
          tension: 0,
        }
      })
    }
    if(this.graphOptions.average){
      datasets.push({
        label: this.graphData.average.label,
        data: this.graphData.average.intervallesNormalises.map((i:any)=>i.value),
        fill: false,
        tension: 0,
      })
    }

    this.data = {
      labels: labels,
      datasets: datasets
    };
      
    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
  }

}
