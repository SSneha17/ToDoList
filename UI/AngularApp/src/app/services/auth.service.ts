import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private route: Router, private http: HttpClient) { 

  }

  apiUrl = "http://127.0.0.1:8000/";


  login(login: Login): Observable<any>{
    // Perform authentication logic with your backend
    // ...
    // If successful, set isAuthenticated to true and store user data
    // ...
    console.log(login.email+" "+login.password)
    let res = this.http.post(this.apiUrl+"user/login", login);
    return res;
    
    //this.route.navigate(['/']);
  }

  logout() {
    // Perform logout logic
    // ...
    this.route.navigate(['/login']);
  }
}
