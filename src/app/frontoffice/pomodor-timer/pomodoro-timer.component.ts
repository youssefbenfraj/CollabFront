import { Component, OnInit } from '@angular/core';
import { Pomodoro } from '../../../models/pomodoro.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RevisionService } from '../../services/revision.service';

@Component({
  selector: 'app-pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.css']
})
export class PomodoroTimerComponent implements OnInit {
  pomodoro: Pomodoro = {
    id: 0,
    startTime: new Date(),
    endTime: new Date(),
    breakTime: 0,
    status: 'Stopped',
    cycleCount: -1,  // Utilisez cette propriété pour suivre les cycles
    userId: 0
  };
  timer: any;
  remainingTime: number = 25 * 60; // 1 minute pour l'exemple
  isRunning: boolean = false;
  currentUser:any
  constructor(private pomodoroService: RevisionService) { }

  ngOnInit(): void {
    this.getCurrentUser()
    this.pomodoro.userId=this.currentUser.id
  }
  getCurrentUser(): void {
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
    }}
  startPomodoro(): void {
    if (this.pomodoro.cycleCount < 5) {
      this.pomodoro.status = 'Running';
      this.pomodoro.cycleCount++; // Incrément directement ici
      this.updatePomodoro();  // Mise à jour après changement
      this.remainingTime = 25 * 60; // Reset pour 1 minute
      this.startTimer();
    }
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        if (this.pomodoro.status === 'Running') {
          this.switchToBreak();
        } else {
          this.switchToWork();
        }
      }
    }, 1000);
    this.isRunning = true;
  }

  switchToBreak(): void {
    if (this.pomodoro.cycleCount >= 5) {
      this.stopPomodoro();
    } else {
      this.pomodoro.status = 'Paused';
      this.pomodoro.cycleCount++; // Incrément pour le break
      this.updatePomodoro();  // Mise à jour après changement
      this.remainingTime = 5 * 60; // 2 minutes break
      this.startTimer();
    }
  }

  switchToWork(): void {
    this.pomodoro.status = 'Running';
    this.updatePomodoro();  // S'assure que le statut est mis à jour
    this.remainingTime = 25 * 60; // 1 minute work
    this.startTimer();
  }

  stopPomodoro(): void {
    clearInterval(this.timer);
    this.pomodoro.endTime = new Date();
    this.pomodoro.status = 'Stopped';
    this.pomodoro.cycleCount = 0; // Réinitialiser les cycles
    this.updatePomodoro();  // Mise à jour finale
    this.isRunning = false;
  }

  pausePomodoro(): void {
    clearInterval(this.timer);
    this.pomodoro.status = 'Paused';
    this.updatePomodoro();  // Mise à jour pour pause
    this.remainingTime = 5 * 60; // 2 minutes pause
    this.startTimer();
  }

  updatePomodoro(): void {
    this.pomodoroService.createOrUpdatePomodoro(this.pomodoro).subscribe({
      next: updatedPomodoro => {
        console.log('Pomodoro updated', updatedPomodoro);
        this.pomodoro = updatedPomodoro;
      },
      error: err => console.error('Failed to update pomodoro', err)
    });
  }
  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
