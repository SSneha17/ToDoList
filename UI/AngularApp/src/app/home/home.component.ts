import { Component, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../model/task';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { JwtDecoderService } from '../services/jwt-decoder.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatCheckboxModule,FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks: Task[]= [];

    newTask: Task = {
    id:0,
    Date: new Date(),
    Task: "",
    isCompleted: false
  };

  

  name:string = '';
  decodedToken: any;
 
  //tasks = [{'id':1, 'name': 'Sneha'},{'id':2,'name':'PS'}]

  
  constructor(private taskService: TasksService, private router: Router){}

  ngOnInit(): void {
  
    this.getTasks();
  }




  getTasks(){
    this.taskService.getTasks().subscribe((result)=>{
      this.tasks = result;
      console.log(this.tasks)
    },
    error=>{
      console.error(error);
    })
    }


    addTask(){
     // let body = new FormData();
    //  body.append('task', this.newTask.Task)
      console.log(this.newTask.Task)
      this.taskService.addTask(this.newTask).subscribe((res)=>
      {
        this.getTasks();
  
      }
      )
    }

    editTask(id:any){
      console.log(id.toString());
      this.router.navigate(['/edit', id]);
    }

    deleteTask(id:any){
      console.log(id);
      this.taskService.deleteTask(id).subscribe((res)=>{
      //  this.taskService.deleteTask(body).subscribe((res)=>{
       alert(res);
       this.getTasks();
      })
    }


    /*
   addTask(){
    let body = new FormData();
    body.append('task', this.newTask)
    this.taskService.addTask(body).subscribe((res)=>
    {alert(res)

    }
    )
  }

  deleteTask(id:any){
  
    this.taskService.deleteTask(id).subscribe((res)=>{
    //  this.taskService.deleteTask(body).subscribe((res)=>{
     alert(res);
     this.getTasks();
    })
  }
  */

}
