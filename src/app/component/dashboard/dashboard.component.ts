import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTasks();
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => {
        alert(err);
      }
    );
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (err) => {
        alert('Unable to get the list of tasks');
      }
    );
  }

  editTask() {
    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Failed to update tasks');
      }
    );
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Failed to delete the task');
      }
    );
  }
}
