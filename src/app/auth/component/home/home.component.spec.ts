import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  component = new HomeComponent();
  
  component.pending_tasks = [
    { title: 'Task 1', description: 'Description 1', priority: 'high', status: 'pending', due_date: new Date(Date.now()), id: '' },
    { title: 'Task 2', description: 'Description 2', priority: 'medium', status: 'pending', due_date: new Date(Date.now()), id: '' },
  ];
  component.progress_tasks = [
    { title: 'Task 3', description: 'Description 3', priority: 'high', status: 'progress', due_date: new Date(Date.now()), id: '' },
    { title: 'Task 4', description: 'Description 4', priority: 'low', status: 'progress', due_date: new Date(Date.now()), id: '' },
  ];
  component.completed_tasks = [
    { title: 'Task 5', description: 'Description 5', priority: 'low', status: 'completed', due_date: new Date(Date.now()), id: '' },
    { title: 'Task 6', description: 'Description 6', priority: 'medium', status: 'completed', due_date: new Date(Date.now()), id: '' },
  ];
});
});
