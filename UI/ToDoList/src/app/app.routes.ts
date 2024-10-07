import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent  },
    {   path: 'edit/:id', component: EditComponent }
];
