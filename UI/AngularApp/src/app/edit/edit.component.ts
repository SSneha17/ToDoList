import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../model/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  id!: number; 
  task: Task | undefined ;
  tasks: Task[] = []

  constructor(private router: ActivatedRoute, private taskService: TasksService){
    this.router.params.subscribe((p) => {this.id = +p['id']});
    this.getTask(this.id);
  }

  ngOnInIt(){
   
    console.log("ID:"+this.id)
    this.getTask(this.id);

  }


  getTask(id:number){
    console.log(id);
    this.taskService.getTask(id).subscribe((result)=>{
      this.tasks = result;
      console.log(this.task)
    },
    error=>{
      console.error(error);
    })
    }

    updateTask(task: Task){
     // let body = new FormData();
     // body.append(
      //console.log(this.newTask.Task)
      this.taskService.updateTask(task).subscribe((res)=>
      {alert(res)
  
      }
      )
    }


}
