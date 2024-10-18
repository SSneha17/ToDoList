import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardActions } from '@angular/material/card';
import {Login} from '../model/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  login: Login;
  constructor(private authService: AuthService, private route: Router) {
    this.login = new Login();
  }

  onSubmit() {
    //debugger;
    this.authService.login(this.login).subscribe((res:any)=>{
     if(res["access_token"] != undefined){ 
      alert(res["access_token"])     
      localStorage.setItem('token',res["access_token"])
      this.route.navigateByUrl("/home");
    
     }
     else{
      alert(res.error.msg);
      console.log(res.error.msg);
     }
    },
  (error)=>{
    console.log(error);
   
  });
  }
}
