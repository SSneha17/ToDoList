import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],  
   templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


@Injectable(
  {
    providedIn: 'root'
  }
)


export class AppComponent implements OnInit {
  title = 'ToDoList';
 // private http:any =  Inject(HttpClient);
  tasks: any = [];
  newTask = "";
 
  //tasks = [{'id':1, 'name': 'Sneha'},{'id':2,'name':'PS'}]

  
  constructor(private taskService: TasksService){}

  ngOnInit(): void {
    this.getTasks();
  }




  getTasks(){
    this.taskService.getTasks().subscribe((result)=>{
      this.tasks = result;
    },
    error=>{
      console.error(error);
    })
    }

   addTask(){
    let body = new FormData();
    body.append('task', this.newTask)
    this.taskService.addTask(body).subscribe((res)=>
    {alert(res)

    }
    )
  }

  deleteTask(id:any){
   /*let body = new FormData();
    console.log("ID:"+id);
    body.append('id', id)
    */
    this.taskService.deleteTask(id).subscribe((res)=>{
    //  this.taskService.deleteTask(body).subscribe((res)=>{
     alert(res);
     this.getTasks();
    })
  }
}
