import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { AnalyseComponent } from './components/analyse/analyse.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    AnalyseComponent,

    UploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'csv-stat-graph';
}
