import { Injectable } from '@angular/core';
import { CsvData } from '../models/CsvData';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  async parseCSV(file:File, type:string): Promise<CsvData>{
    let csvData : CsvData = null;
    switch(type){
      case 'vabysmo':
        csvData=await this.parseVabysmoCSV(file);
        break
      default:
        csvData=await this.parseClassicCSV(file);
    };
    return csvData;
  }

  private async parseClassicCSV(file:File): Promise<CsvData>{
    let result = await file.text();
    let lines = result.split('\n')
    let headers : string[]= lines[0].split(";").filter((d)=>d!='').map((d)=>d.toLowerCase())
    let data : any[] = lines.slice(1).map((line)=>{
      let lineData = line.split(";")
      let lineOjectData : any = {};
      for(let k=0; k<headers.length; k++){
        lineOjectData[headers[k]]=lineData[k];
      }
      return lineOjectData
    })
    return new CsvData(headers, data);
  }

  private async parseVabysmoCSV(file:File): Promise<CsvData>{
    let result = await file.text();
    let lines = result.split('\n')
    let headers : string[]= lines[0].split(";").filter((d)=>d!='').map((d)=>d.trim().toLowerCase())
    let indexColumnInj : number = headers.findIndex((l)=>l=='injections')
    let dataLines = lines.slice(1).map((l)=>l.split(";"));
    dataLines= dataLines.filter((l)=>l.filter((d:string)=>d!='' && d!='\r').length>0)
    let data : any[] = [];
    let currentData : any = null;
    for(let line of dataLines){
      if(line[0]!=''){
        if(currentData){
          data.push({...currentData})
        }
        
        currentData = {}
        for(let k=0; k<headers.length; k++){
          if(['injections'].indexOf(headers[k])>-1){
            currentData[headers[k]]=[{date:this.stringToDate(line[k]), type: line[k-1]}];
          } else {
            currentData[headers[k]]=line[k].trim();
          }
        }
      } else {
        currentData['injections'].push({date:this.stringToDate(line[indexColumnInj]), type: line[indexColumnInj-1]})
      }
    }
    data.push({...currentData})
    data.sort((d1,d2)=> d1.nom < d2.nom ? -1 : 1)
    return new CsvData(headers, data);
  }

  stringToDate(dateStr: string){
    var dateParts = dateStr.split("/");
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]); 
  }

  deleteEmptyLine(lines:any[]){
    lines.filter((l)=>l.filter((d:string)=>d!='').length>0)
  }
}
