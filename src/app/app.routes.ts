import { Routes } from '@angular/router';
import { AnalyseComponent } from './components/analyse/analyse.component';
import { UploadComponent } from './components/upload/upload.component';

export const routes: Routes = [
    { path: '', component: UploadComponent },
    { path: 'analyse', component: AnalyseComponent },
];
