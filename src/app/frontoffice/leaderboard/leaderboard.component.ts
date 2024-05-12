import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  events:any[] = [];
  users: any[] = [];

  constructor(private eventService: EventService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchLeaderboard();
    this.fetchLeaderboardS();
  }

  fetchLeaderboard(): void {
    this.eventService.getLeaderboard().subscribe({
      next: (events) => {
        this.events = events;  // Update this line
        console.log(this.events);  // Verify that events are received correctly
      },
      error: (error) => {
        console.error('Error fetching leaderboard:', error);
      }
    });
  }
  
  fetchLeaderboardS(): void {
    this.userService.getLeaderboardS().subscribe({
      next: (users) => {
        this.users = users;
       
      
        console.log('Leaderboard data:', this.users);
      },
      error: (err) => {
        console.error('Failed to fetch student leaderboard:', err);
      }
    });
  }
  
}
