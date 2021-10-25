import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { title } from 'process';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})

export class TodosComponent implements OnInit {

  todos: Todo[]
  showValidationErrors: boolean

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshTodos();
  }
  refreshTodos(): void{
    this.dataService.getAllTodos().subscribe(res => {
        if (res['status'] == 200){
          this.todos = res['data']['rows'];
        }
      }, err => console.log("THIS IS ERROR"));
  }

  onFormSubmit(form: any) {
    form = { ...form, status:"incomplete",}
    this.dataService.addTodo(form).subscribe(result => {
      console.log(result);
      this.refreshTodos();
    }, err => console.log(err));

  }

  toggleCompleted(todo: any) {
    console.log(todo);
    todo.status = todo.status == 'complete'? 'incomplete' : 'complete';
    console.log(todo.status);
    this.dataService.updateStatus(todo)
    .subscribe(res => {
      console.log(res['message']);
      this.refreshTodos();
    }, err => console.log(err))
  }

  editTodo(todo: Todo) {
        let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateTodo(result).subscribe(res =>{
          console.log(res['message']);
          this.refreshTodos();
        })
      }
    })
  }

  deleteTodo(todo: any) {
    this.dataService.deleteTodo(todo).subscribe(result => {
      console.log(result['message']);
      this.todos.splice(this.todos.indexOf(todo),1);
      this.refreshTodos();
    }, err => console.log(err));
  }
  
}
