import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from 'src/app/services/task.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let taskServiceMock: TaskService;

  beforeEach(async () => {
    taskServiceMock = jasmine.createSpyObj('TaskService', ['getData', 'saveData']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: TaskService, useValue: taskServiceMock }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should delete a task from pending_tasks array when status is pending', () => {
    // Mock task data
    const taskToDelete = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending',
      due_date: new Date(),
      priority: 'high',
      id: '1'
    };

    // Set up initial pending tasks
    component.pending_tasks = [taskToDelete, /* add more tasks if needed */];

    // Call the deleteTask function with the task to delete
    component.deleteTask(taskToDelete);

    // Expect the task to be removed from pending_tasks array
    expect(component.pending_tasks).not.toContain(taskToDelete);

    // Expect the saveData method of taskService to be called with updated pending tasks
    expect(taskServiceMock.saveData).toHaveBeenCalledWith('pending_tasks', component.pending_tasks);
  });

  it('should set up the taskForm with the correct values when updateTask is called', () => {
    // Mock task data
    const taskToUpdate = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending',
      due_date: new Date(),
      priority: 'high',
      id: '1'
    };

    // Set up initial pending tasks
    component.pending_tasks = [taskToUpdate, /* add more tasks if needed */];

    // Call updateTask with the task to update
    component.updateTask(taskToUpdate);

    // Expect the taskForm to be initialized with the values of the task to update
    const expectedFormValues = {
      title: taskToUpdate.title,
      description: taskToUpdate.description,
      due_date: taskToUpdate.due_date,
      priority: taskToUpdate.priority,
      status: taskToUpdate.status,
      id: taskToUpdate.id
    };

    expect(component.taskForm.value).toEqual(expectedFormValues);
  });

  
  
});
