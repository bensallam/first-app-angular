import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  editForm = false;
  myTask: Task = {
    label : '',
  completed : false
  };
tasks: Task[] = [];

  constructor( private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.taskService.findAll().subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(id) {
    this.taskService.delete(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
  }

  AddTask() {
    this.taskService.persist(this.myTask)
        .subscribe((task) => {
      this.tasks = [task, ...this.tasks];
      this.resetTask();
    });
  }

  resetTask() {
    this.myTask = {
      label: '',
      completed: false
    };
  }

  toggleCompleted(task) {
    this.taskService.completed(task.id, task.completed)
      .subscribe(() => {
        task.completed = !task.completed;
      });
  }

  ediTask(task) {
    this.myTask = task;
    this.editForm = true;
  }

  updateTask() {
    this.taskService.update(this.myTask)
        .subscribe((task) => {
        this.resetTask();
        this.editForm = false;

      });


  }
}
