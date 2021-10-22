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
    this.dataService.getAllTodos().subscribe(res => {
    if (res['status'] == 200){
      this.todos = res['data']['rows'];
      
    }
    }, err => console.log("THIS IS ERROR"));
  }

  onFormSubmit(form: Todo) {
    this.dataService.addTodo(form).subscribe(result => {
    });

  }

  toggleCompleted(todo: any) {
    todo.status = todo.status == 'completed'? 'completed' : 'incomplete';
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
        })
      }
    })
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)
    this.dataService.deleteTodo(index)
  }
  
}
