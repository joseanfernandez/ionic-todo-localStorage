import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo';
import { AlertController, NavController, List } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('slidingList') slidingList: List;

  todos: Todo[];
  desc: boolean;
  like: boolean;

  constructor(
    private todoService: TodoService,
    private alertController: AlertController,
    private navController: NavController
    ) {
      this.desc = true;
      this.like = false;
    }

  ngOnInit() {
    this.todoService.getTodos().then(todos => {
      this.todos = todos;
    });
  }

  ionViewWillEnter() {

    this.todoService.getTodos().then(todos => {
      this.todos = todos;
    });

  }

  async delete(id: number, title: String) {

    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Borrar la tarea <strong>' + title + '</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.todoService.delete(id);
            this.slidingList.closeSlidingItems();
            this.todoService.getTodos().then(todos => {
              this.todos = todos;
            });
          }
        }
      ]
    });

    await alert.present();

  }

  edit(id: number) {
    this.navController.navigateForward('/edit/' + id);
  }

  async clearStorage() {
    const alert = await this.alertController.create({
      header: 'Vaciar lista de tareas',
      message: '¿Estás seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.todoService.clearStorage();
          }
        }
      ]
    });

    await alert.present();
  }

  orderDesc() {
    this.todos.sort((a, b) => (a.priority > b.priority) ? -1 : ((b.priority > a.priority) ? 1 : 0));
  }

  orderAsc() {
    this.todos.sort((a, b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0));
  }

  arrayPriority(n: number): any[] {
    return Array(n);
  }

  setLike(): void {
    ((this.like) ? this.like = false : this.like = true);
  }





}
