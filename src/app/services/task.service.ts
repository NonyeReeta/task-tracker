import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

    // save data to local storage
    saveData(key: string, data: any) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  
    // retrieve data from local storage
    getData(key: string): any {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }

    // clear storage for test
    clearLocalStorage() {
      localStorage.clear();
    }
}
