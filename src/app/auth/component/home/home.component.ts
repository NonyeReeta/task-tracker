import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList
} from '@angular/cdk/drag-drop';

interface Task {
  title: string,
  description: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  open_tasks:Task[] = [{title: 'TLorem ipsum dolor sit amet', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum euismod tempus.'}, {title: 'TLorem ipsum dolor sit amet', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum euismod tempus.'}];
  closed_tasks:Task[] = [{title: 'TLorem ipsum dolor sit amet', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum euismod tempus.'}];
  pending_tasks:Task[] = [{title: 'TLorem ipsum dolor sit amet', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fermentum euismod tempus.'}];

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
  }

}
