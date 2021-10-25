import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: Todo[];
  
  constructor(private http: HttpClient) { }

  getAllTodos() {
    let url= "http://localhost:3000/"
    return this.http.get(url);
  }

  addTodo(todo: any) {
    
    let url= "http://localhost:3000/"
    return this.http.post(url,todo);
   
  }

  updateTodo(updatedTodo: any) {
    let url= "http://localhost:3000/"
      return this.http.put(url, updatedTodo);
  }

  deleteTodo(todo : any) {
    let url= `http://localhost:3000/?id=${todo.id}`
    return this.http.delete(url);
  }

  updateStatus(todo : any) {
    let url= `http://localhost:3000/togStat?id=${todo.id}&status=${todo.status}`
    return this.http.put(url, todo);
  }
  
}
