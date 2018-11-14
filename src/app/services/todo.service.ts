import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];
  index;

  constructor(private storage: Storage) {
  }

  getTodos(): Promise<Todo[]> {
    return this.storage.get('todos').then((data) => {
      if (data) {
        this.todos = data;
        this.storage.get('index').then((index) => {
          this.index = index;
        });

      } else {
      this.storage.set('index', 0);
      }
      return data;
    });
  }

  save(t): Promise<Todo[]> {
    this.todos.push(t);
    this.index = t.id;
    this.storage.set('index', this.index);
    return this.storage.set('todos', this.todos);
  }

  edit(t): Promise<Todo[]> {
    this.todos[this.todos.findIndex(todo => todo.id === t.id)] = t;
    return this.storage.set('todos', this.todos);
  }

  delete(id): Promise<Todo[]> {
    this.todos = this.todos.filter(t => t.id !== id);
    return this.storage.set('todos', this.todos);
  }

  getTodoById(id: number): Todo {
    return this.todos.find(t => t.id === id);
  }

  clearStorage() {
    this.storage.clear().then(() => {
      location.reload();
    });
  }
}
