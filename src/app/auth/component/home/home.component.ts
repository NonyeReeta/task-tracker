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
  priority: string,
  id: string
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
 

  // function to detect drop and change task status
  drop(event: CdkDragDrop<Task[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let t:Task | undefined = event.container.data.at(-1);
      if(t !== undefined) {
        // remove task from its list
        this.deleteTask(t);
        // update the task status and add to new list
        t.status = status;
        this.dropChangeStatus(status);
      }
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
    status: new FormControl(null, Validators.required),
    id: new FormControl(this.generateRandomId(), Validators.required)
  })

  ngOnInit() {
    // uncomment the clearLocalstorage function to clear all saved task for test purpose
    // this.taskService.clearLocalStorage();
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
    // add new task and set operation progress to false;
    if(this.taskForm.value.status === 'pending') {
      this.pending_tasks.push(this.taskForm.value);
      this.taskService.saveData('pending_tasks', this.pending_tasks);
    } else if (this.taskForm.value.status === 'in progress') {
      this.progress_tasks.push(this.taskForm.value);
      this.taskService.saveData('progress_tasks', this.progress_tasks);
    } else {
      this.completed_tasks.push(this.taskForm.value);
      this.taskService.saveData('completed_tasks', this.completed_tasks);
    }
    this.is_operation_in_progress = false;
    this.show_new_task_modal = false;
  };

  viewTask(task: Task) {
    this.task = task;
  };

  deleteTask(task:Task) {
    if(task.status === 'pending') {
      const index_to_delete = this.pending_tasks.findIndex(t => t.id === task.id);
      if(index_to_delete !== -1) {
        this.pending_tasks.splice(index_to_delete, 1);
        this.taskService.saveData('pending_tasks', this.pending_tasks);
      }
    } else if (task.status === 'in progress') {
      const index_to_delete = this.progress_tasks.findIndex(t => t.id === task.id);
      if(index_to_delete !== -1) {
        this.progress_tasks.splice(index_to_delete, 1);
        this.taskService.saveData('progress_tasks', this.progress_tasks);
      }
    } else {
      const index_to_delete = this.completed_tasks.findIndex(t => t.id === task.id);
      if(index_to_delete !== -1) {
        this.completed_tasks.splice(index_to_delete, 1);
        this.taskService.saveData('completed_tasks', this.completed_tasks);
      };
    }
    this.show_task = false;
  };

  updateTask(task: Task) {};

  dropChangeStatus(status: string) {
    if(status === 'pending') {
      this.taskService.saveData('pending_tasks', this.pending_tasks);
    } else if (status === 'in progress') {
      this.taskService.saveData('progress_tasks', this.progress_tasks);
    } else {
      this.taskService.saveData('completed_tasks', this.completed_tasks);
    }
  };

  // function to generate a random id for each task
  generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9); 
  }

}
