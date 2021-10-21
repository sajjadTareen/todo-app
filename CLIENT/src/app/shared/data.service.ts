import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: Todo[] = [
    // new Todo('this is a test!', false),
    // new Todo('Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates dolorem alias dolores deserunt, qui, amet odio facilis tempora unde sequi numquam explicabo nihil iste labore beatae ea rerum expedita.', true)
  ]
  
  constructor(private http:HttpClient) { }

  getAllTodos() {
    let url= "http://localhost:3000/"
    return this.http.get(url);
  }

  addTodo(todo: Todo) {
    //this.todos.push(todo)
  }

  updateTodo(id: number, updatedTodo: Todo) {
    let url= "http://localhost:3000/"
    return this.http.put(url,id);
  }

  deleteTodo(index: number) {
    //this.todos.splice(index, 1)
  }
  
}
