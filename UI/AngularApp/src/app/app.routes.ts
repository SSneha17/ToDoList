import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
   
    {   path: '', redirectTo: 'login', pathMatch: 'full'},
    {   path:'', component:LayoutComponent, children:[{path:'home', component:HomeComponent}] },
    {   path: 'home', component: HomeComponent  },
    {   path: 'edit/:id', component: EditComponent },
    {   path:'login', component:LoginComponent },
    
];
