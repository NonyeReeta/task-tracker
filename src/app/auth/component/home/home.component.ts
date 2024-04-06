import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

interface Task {
  title: string,
  description: string,
  status: string,
  due_date: Date,
  priority: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  pending_tasks:Task[] = [];
  progress_tasks:Task[] = [];
  completed_tasks:Task[] = [];

  show_task:boolean = false;
  task:any = {};

  show_new_task_modal:boolean = false;
  is_operation_in_progress:boolean = false;
 

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  };

  constructor(
    private taskService: TaskService
  ) {}

  taskForm: FormGroup = new FormGroup ({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    due_date: new FormControl(null, Validators.required),
    priority: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required)
  })

  ngOnInit() {
    // load all task
    this.loadAllTasks();
  };

  loadAllTasks() {
    // load existing tasks
    this.pending_tasks = this.taskService.getData('pending_tasks') || [];
    this.progress_tasks = this.taskService.getData('progress_tasks') || [];
    this.completed_tasks = this.taskService.getData('completed_tasks') || [];
  };

  AddTask() {
    this.is_operation_in_progress = true;
    // add new task to pending and set operation progress to false;
    this.pending_tasks.push(this.taskForm.value);
    this.taskService.saveData('pending_tasks', this.pending_tasks);
    this.is_operation_in_progress = false;
    this.show_new_task_modal = false;
    console.log(this.taskForm.value);
  };

  viewTask(task: Task) {
    this.task = task;
  };

  deleteTask(task: Task) {

  };

  updateTask(task: Task) {};

}
