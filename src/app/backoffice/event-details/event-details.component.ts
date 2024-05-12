import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-details', 
  templateUrl: './event-details.component.html', // Mettez à jour le chemin vers le template HTML si nécessaire
  styleUrls: ['./event-details.component.css'] // Mettez à jour les styles CSS si nécessaire
})
export class EventDetailsComponent implements OnInit {
  eventDetails: any; 
  constructor(private route: ActivatedRoute, private eventService: EventService) { } 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const eventId = +params['eventId']; 
      this.eventService.getEventById(eventId).subscribe(
        (eventData) => {
          this.eventDetails = eventData; 
        },
        (error) => {
          console.error('Error fetching event details:', error); 
        }
      );
    });
  }
}

