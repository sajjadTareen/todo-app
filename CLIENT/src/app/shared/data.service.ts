import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: Todo[] = [
    // new Todo('this is a test!', false),
    // new Todo('Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates dolorem alias dolores deserunt, qui, amet odio facilis tempora unde sequi numquam explicabo nihil iste labore beatae ea rerum expedita.', true)
  ]
  
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

<<<<<<< HEAD
  deleteTodo(todo: Todo) {
    console.log(todo)
    let url= `http://localhost:3000/?id=${todo.id}`
    console.log(url)
    return this.http.delete(url)
=======
  deleteTodo(todo : any) {
    let url= `http://localhost:3000/?id=${todo.id}`
    return this.http.delete(url);
  }

  updateStatus(todo : any) {
    let url= `http://localhost:3000/togStat?id=${todo.id}&status=${todo.status}`
    return this.http.put(url, todo);
>>>>>>> b31949fe9be23450b40485e8ddf12516f4e7cf9c
  }
  
}
