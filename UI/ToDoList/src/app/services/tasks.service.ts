import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  apiUrl = "http://127.0.0.1:8000/";
  
  constructor(private http: HttpClient) { }

  

  getTasks(): Observable<any>{
    //console.log(this.http.get("http://127.0.0.1:8000/get_tasks"));
    return this.http.get(this.apiUrl +"get_tasks");
    }

  
  getTask(id:number): Observable<any>{
      //console.log(this.http.get("http://127.0.0.1:8000/get_tasks"));
      return this.http.get(this.apiUrl +"get_task/"+id);
      }


  addTask(body:any): Observable<any>{
    console.log(body);
    let res =  this.http.post(this.apiUrl+"add_task",body);
    console.log(res)
    return res;
  }

  updateTask(task:Task): Observable<any>{
    console.log(task);
    let res =  this.http.put(this.apiUrl+"update_task",task);
    console.log(res)
    return res;
  }
 
  deleteTask(id:number): Observable<any>{
    console.log(id);
    let res = this.http.delete(this.apiUrl+"delete_task/"+id);
    return res;
  }

 /*
  deleteTask(id:any): Observable<any>{
    let body = new FormData();
    console.log("ID:"+id);
    body.append('id', id)
    console.log(body);
    let res = this.http.delete(this.apiUrl+"delete_task", body);
    return res;
  }
*/


}
