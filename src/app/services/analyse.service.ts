import { Injectable } from '@angular/core';
import { CsvData } from '../models/CsvData';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {

  constructor() { }

  computeGraphData(data: CsvData, type:string){
    switch(type){
      case 'vabysmo':
        return this.computeVabysmoData(data);
        break
      default:
        return null
    };
  }

  private computeVabysmoData(data: CsvData){
    //On forme un objet de la forme
    /**
     * {
     *    patients:[{
     *        label:Prenom nom,
     *        intervalles:[{index:n, value:n}]
     *        intervallesNormalises:[{index:n, value:n}]
     *    }],
     *    average:[{
     *        label:Average,
     *        intervallesNormalises:[{index:n, value:n}]
     *    }]
     * }
     */
    let graphData : any = {
      'patients' : [],
      'average':null
    };

    for(let patient of data.data){
      let patientData = {
        label:`${patient.prenom} ${patient.nom}`,
        intervalles:[] as any,
        intervallesNormalises:[] as any
      }

      let intervalleNormalisation: number = null;
      let indexNormalisation = null;
      let intervalles = [];

      for(let k=1; k<patient.injections.length; k++){
        let injection1 = patient.injections[k-1];
        let injection2 = patient.injections[k];
        let intervalle = Math.floor((injection2.date - injection1.date)/(1000*60*60*24));
        if(!intervalleNormalisation && injection2.type=='V'){
          intervalleNormalisation = intervalle;
          indexNormalisation = k;
        }
        intervalles.push(intervalle)
      }

      for(let i=0; i<intervalles.length; i++){
        patientData.intervalles.push({index:i-indexNormalisation+1, value:intervalles[i]})
      }

      patientData.intervallesNormalises = patientData.intervalles.map((i:any)=>{return {index:i.index, value: i.value/intervalleNormalisation}});
      graphData.patients.push(patientData)
    }

    //Compute average
    let intervalleAverage = [];
    let labels = [-5,-4,-3,-2,-1,0,1,2,3,4,5]
    for(let l of labels){
      let sum = 0;
      let nbr = 0;
      for(let patient of graphData.patients){
        if(patient.intervallesNormalises.find((i:any)=>i.index==l)){
          sum+=patient.intervallesNormalises.find((i:any)=>i.index==l).value;
          nbr+=1
        }
      }
      if(nbr<5){
        intervalleAverage.push({index:l, value:null})
      } else {
        intervalleAverage.push({index:l, value:sum/nbr})
      }
    }
    graphData.average={
      label:`Average`,
      intervallesNormalises:intervalleAverage,
    }
    return graphData;
  }
}
