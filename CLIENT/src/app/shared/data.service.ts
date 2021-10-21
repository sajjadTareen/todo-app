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
    let url= "https://jsonplaceholder.typicode.com/todos"
    // return this.http.get(url);
    return this.todos
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
  }

  updateTodo(index: number, updatedTodo: Todo) {
    this.todos[index] = updatedTodo
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1)
  }
  
}
