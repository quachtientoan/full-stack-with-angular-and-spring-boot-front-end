import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from './../todos/todos.component';
import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo : Todo
  id : number
  constructor(
    private todoService : TodoDataService,
    private activatedRouter : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params['id']
    this.todo = new Todo(this.id,'',false,new Date)
    if(this.id != -1){
      this.todoService.getTodo(`admin`,this.id).subscribe(
        response => {
          this.todo = response
        }
      )
    }
   
  }

  saveTodo(){
    if(this.id == -1){
      console.log(`createTodo`)
      this.todoService.createTodo(`admin`, this.todo).subscribe(
        response => {
          this.router.navigate(['todo'])
        }
      )
    }else{
      console.log(`updateTodo`)
      this.todoService.updateTodo(`admin`, this.id, this.todo).subscribe(
        response => {
          this.router.navigate(['todo'])
        }
      )
    }
   
  }


}
