import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RevisionService } from '../../services/revision.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    task: '',
    description: '',
    completed: false,
    priority: 0,
    isFavorite: false, // Ajouter cette ligne
    userId:1
  };
   favoriteTasks: Task[] = [];
  // currentUser:any;
   selectedBooks: Task | null = null;
   filteredTasks: Task[] = [];
  searchText: string = '';
  newTaask: Task = {} as Task;
  userData: any;
  currentUser: { id: number } | null = null;   

  constructor(private taskService: RevisionService) { }
/*getCurrentUser(): void {
  debugger
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log('current user:', userData);
      
      if ('idUser' in userData) {
          const userId = userData.idUser;
          console.log('User ID:', userId);
          this.currentUser = { id: userId };
      } else {
          console.log('No user ID found in userData');
      }
  } else {
      console.log('No user data found in localStorage');
  }} */
  ngOnInit(): void {
    this.getTasks();
    this.getCurrentUser()
 
  }
  getTasks(): void {
    this.taskService.getTasksSortedByPriority().subscribe(tasks => this.tasks = tasks);
  }

  loadTasks(): void {
    this.taskService.getTasksSortedByPriority().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  filterTs1(): void {
    if (!this.searchText) {
      this.filteredTasks = [...this.tasks];  // Utilisez spread pour forcer la mise à jour du binding
    } else {
      this.filteredTasks = this.tasks.filter(task =>
        task.task.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  filterTasks(): void {
    debugger
    console.log('kkkk');
    if (!this.searchText) {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task =>
        task.task.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  deleteT(id: number | undefined): void {
    if (id !== undefined) {
      this.taskService.deleteT(id).subscribe({
        next: () => {
          console.log('Task deleted successfully from backend');
          this.tasks = this.tasks.filter(task => task.id !== id);
          console.log('Frontend state updated, task removed');
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    } else {
      console.error('Task ID is undefined');
    }
  }
  
   

  toggleFavorite(task: Task): void {
    if (task.id !== undefined) {
     // debugger
      this.taskService.toggleFavorite(task.id).subscribe(() => {
        task.isFavorite = !task.isFavorite;
      });
    } else {
      console.error('Task ID is undefined');
    }
  
  }
   
getCurrentUser(): void {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log('current user:', userData);
      
      if ('idUser' in userData) {
          const userId = userData.idUser;
          console.log('User ID:', userId);
          this.currentUser = { id: userId };
      } else {
          console.log('No user ID found in userData');
      }
  } else {
      console.log('No user data found in localStorage');
  }
}
  getTasks2(): void {
    this.taskService.getAllTasks().subscribe(tasks => this.tasks = tasks);
  } 
  /*
  addTask(): void {
    this.newTask = {
      task: 'A',
      description: 'B',
      completed: false,
      priority: 0,
      isFavorite: false,
      userId: this.currentUser.id



      
    };
    this.taskService.createTask(this.newTask).subscribe(task => {
      this.tasks.push(task);

    });
  }*/

  addTask() {
    if (this.currentUser && this.currentUser.id) {
      const taskData = {
        userId: this.currentUser.id,
        task: this.newTaask.task,
        description: this.newTaask.description,
        priority: this.newTaask.priority,
        isFavorite: this.newTaask.isFavorite,
        completed: this.newTaask.completed
      };
  
      this.taskService.createTask(taskData).subscribe(
        response => {
          console.log('Task added successfully!', response);
          this.tasks.push(response);  // Assuming response is the task object returned from the server
          this.newTaask = {} as Task; // Reset the form
        },
        error => {
          console.error('Error adding task:', error);
        }
      );
    } else {
      console.error('Current user is null or ID is undefined.');
    }
  }
  
 /* addTaskbk(): void {
    this.newTask = {
      task: 'A',
      description: 'B',
      completed: false,
      priority: 0,
      isFavorite: false,
      userId: this.currentUser.id



      
    }; 
    this.taskService.createTask(this.newTask).subscribe(task => {
      this.tasks.push(task);

    });
  }
*/
  updateTask(task: Task): void {
    this.taskService.updateTask(task.id!, task).subscribe();
  }
}