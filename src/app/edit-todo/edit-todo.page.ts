import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {

  todo: Todo;
  todos: Todo[];
  id: number;
  category: number;

  constructor(
    private todoService: TodoService,
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private storage: Storage
    ) {
      this.storage.get('index').then((data) => {
        this.id = data + 1;
      });
     }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.todo = this.todoService.getTodoById(+id);
      this.changeColor();
    } else {
        this.todo = {
          id: this.id,
          title : '',
          description : '',
          priority: 1,
          category: 0
      };
    }
  }

  send() {
    this.todo.category = +this.category;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.todo.id = this.id;
      this.todoService.save(this.todo);
    } else {
      this.todoService.edit(this.todo);
    }
    this.navController.goBack(true);
  }

  notify() {
    this.changeColor();
  }

  changeColor() {
    const background = document.getElementById('range');
    const inputTitle = document.getElementById('inputTitle');
    const inputDescription = document.getElementById('inputDescription');

    if (this.todo.priority === 1) {
      background.style.backgroundColor = '#FAFAFA';
      inputTitle.style.backgroundColor = '#FAFAFA';
      inputDescription.style.backgroundColor = '#FAFAFA';
    } else if (this.todo.priority === 2) {
      background.style.backgroundColor = '#FDF8C4';
      inputTitle.style.backgroundColor = '#FDF8C4';
      inputDescription.style.backgroundColor = '#FDF8C4';
    } else {
      background.style.backgroundColor = '#FFDB99';
      inputTitle.style.backgroundColor = '#FFDB99';
      inputDescription.style.backgroundColor = '#FFDB99';
    }
  }

}
