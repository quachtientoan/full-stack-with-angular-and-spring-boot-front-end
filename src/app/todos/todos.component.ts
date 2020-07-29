import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[]

  message: string

  username: string

  constructor(
    private todoService: TodoDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.refreshTodos()
  }

  refreshTodos() {

    // this.username = this.activatedRoute.snapshot.children['name']
    this.todoService.getAllTodos(`admin`).subscribe(
      response => {
        this.todos = response
      }
    )
  }

  deleteTodo(id) {
    return this.todoService.deleteTodo(`admin`,id).subscribe(
      response => {
        this.message = `Delete of todo ${id} Successfull`
        this.refreshTodos()
      }
    )
  }

  updateTodo(id) {
    this.router.navigate(['todo', id])
  }

  addTodo() {
    this.router.navigate(['todo', -1])
  }
}
