import { API_URL } from './../../app.constant';
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
   return this.http.get<Todo[]>(`${API_URL}/jpa/users/${username}/todos`)
  }

  getTodo(username,id){
    return this.http.get<Todo>(`${API_URL}/jpa/users/${username}/todos/${id}`)
   }

  deleteTodo(username,id){
    return this.http.delete<Todo>(`${API_URL}/jpa/users/${username}/todos/${id}`)
  }

  createTodo(username, Todo){
    return this.http.post<Todo>(`${API_URL}/jpa/users/${username}/todos`, Todo)
  }

  updateTodo(username, id, Todo){
    return this.http.put<Todo>(`${API_URL}/jpa/users/${username}/todos/${id}`, Todo)
  }


}
