import { API_URL, TODO_JPA_API_URL } from './../../app.constant';
import { Todo } from './../../todos/todos.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
   private http : HttpClient,

  ) { }

  getAllTodos(username){
   return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/users/${username}/todos`)
  }

  getTodo(username,id){
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`)
   }

  deleteTodo(username,id){
    return this.http.delete<Todo>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`)
  }

  createTodo(username, Todo){
    return this.http.post<Todo>(`${TODO_JPA_API_URL}/users/${username}/todos`, Todo)
  }

  updateTodo(username, id, Todo){
    return this.http.put<Todo>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`, Todo)
  }


}
