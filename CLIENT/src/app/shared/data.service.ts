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
<<<<<<< HEAD
    let url= "https://jsonplaceholder.typicode.com/todos"
    // return this.http.get(url);
    // console.log(this.todos)
    return this.todos
=======
    let url= "http://localhost:3000/"
    return this.http.get(url);
>>>>>>> 960c28b5d8d2e71bef05986d3425cbca2924742d
  }

  addTodo(todo: Todo) {
    //this.todos.push(todo)
  }

  updateTodo(updatedTodo: Todo) {
    let url= "http://localhost:3000/"
    const body = updatedTodo;
    console.log(updatedTodo);
    return this.http.put(url,body);
  }

  deleteTodo(index: number) {
    //this.todos.splice(index, 1)
  }
  
}
