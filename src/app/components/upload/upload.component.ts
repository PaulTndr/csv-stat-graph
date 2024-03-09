import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'upload',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FileUploadModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  constructor(private readonly dataService: DataService) { }

  onBasicUploadAuto(event:any){
    this.dataService.parseCSV(event.files[0]);
  }

}
