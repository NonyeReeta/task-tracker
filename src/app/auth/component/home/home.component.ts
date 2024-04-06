import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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

  task_to_edit:any = {};
  search_query:string = '';
  search_pending:string = '';
  search_progress:string = '';
  search_completed:string = '';


  constructor(
    private taskService: TaskService
  ) {}

  taskForm: FormGroup = new FormGroup ({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    due_date: new FormControl(null, Validators.required),
    priority: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
    // id: new FormControl(this.generateRandomId(), Validators.required)
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
    if(Object.keys(this.task_to_edit).length > 0) {
      this.deleteTask(this.task_to_edit);
    };
    this.taskForm.value.id = this.generateRandomId();
    if(this.taskForm.value.status === 'pending') {
      this.pending_tasks.push(this.taskForm.value);
      this.taskService.saveData('pending_tasks', this.pending_tasks);
    } else if (this.taskForm.value.status === 'in progress') {
      this.progress_tasks.push(this.taskForm.value);
      this.taskService.saveData('progress_tasks', this.progress_tasks);
    } else {
      this.completed_tasks.push(this.taskForm.value);
      this.taskService.saveData('completed_tasks', this.completed_tasks);
    };
    this.show_new_task_modal = false;
    this.taskForm.reset();
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

  updateTask(task: Task) {
    this.show_task = false;
    this.task_to_edit = task;
    // autofill form with task
    this.taskForm = new FormGroup({
      title: new FormControl(this.task_to_edit.title, Validators.required),
      description: new FormControl(this.task_to_edit.description, Validators.required),
      due_date: new FormControl(this.task_to_edit.due_date, Validators.required),
      priority: new FormControl(this.task_to_edit.priority, Validators.required),
      status: new FormControl(this.task_to_edit.status, Validators.required),
      id: new FormControl(this.generateRandomId(), Validators.required)
    });
    this.show_new_task_modal = true;
  };

  dropChangeStatus(new_status: string) {
    if(new_status === 'pending') {
      this.taskService.saveData('pending_tasks', this.pending_tasks);
    } else if (new_status === 'in progress') {
      this.taskService.saveData('progress_tasks', this.progress_tasks);
    } else {
      this.taskService.saveData('completed_tasks', this.completed_tasks);
    }
  };


  viewTask(task: Task) {
    this.task = task;
  };

  // function to generate a random id for each task
  generateRandomId(): string {
    if(Object.keys(this.task_to_edit).length > 0) {
      return this.task_to_edit.id;
    };
    return Math.random().toString(36).substr(2, 9); 
  }

  // filter tasks based on query input
  filterTasks(list_type: string): any[] {
    let list_to_filter: any[];
    let search_query: string;
  
    // identify whuch query and list to filter
    switch (list_type) {
      case 'pending':
        list_to_filter = this.pending_tasks;
        search_query = this.search_pending;
        break;
      case 'in progress':
        list_to_filter = this.progress_tasks;
        search_query = this.search_progress;
        break;
      case 'completed':
        list_to_filter = this.completed_tasks;
        search_query = this.search_completed;
        break;
      default:
        return [];
    }
  
    // If search query is empty or whitespace, return the original list without filtering
    if (!search_query.trim()) {
      return list_to_filter;
    }
  
    // Otherwise, filter the list based on the search query
    const searchTerm = search_query.toLowerCase().trim();
  
    return list_to_filter.filter(task => {
      return task.title.toLowerCase().includes(searchTerm) || task.description.toLowerCase().includes(searchTerm);
    });
  }
  

}
