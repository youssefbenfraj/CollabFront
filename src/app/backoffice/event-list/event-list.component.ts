
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';



@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events:any[] = [];

  constructor(private eventService: EventService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe(
      events => {
        this.events = events;
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  editEvent(idEvent: number): void {
    console.log('Edit event clicked with ID:', idEvent); // Log the ID
    if (idEvent && !isNaN(idEvent)) {
        const eventData = {}; // Data to update for the event
        this.eventService.updateEvent(idEvent, eventData).subscribe(
            (response) => {
                console.log('Update event response:', response); // Log the response
           
                console.log('Event updated successfully:', response);
            },
            (error) => {
                console.error('Error updating event details:', error);
            }
        );
    } else {
        console.error('Invalid event ID:', idEvent);
    }
}





    
  
    deleteEvent(idEvent: any) {
        // Convert id to a valid number using parseInt
        const eventId = parseInt(idEvent, 10);
        console.log('Deleting event with ID:', eventId);
      
        if (!isNaN(eventId)) { // Check if eventId is a valid number
          if (confirm("Are you sure you want to delete this event?")) {
            this.eventService.deleteEvent(eventId).subscribe(
              () => {
                console.log("Event deleted successfully");
                this.toastr.success('Event deleted successfully', 'Success');
                this.fetchEvents(); // Met à jour la liste des événements après la suppression
              },
              error => {
                console.error('Error deleting event:', error);
                this.toastr.error('Failed to delete event', 'Error');
              }
            );
          }
        } else {
          console.error('Invalid event ID:', idEvent);
          this.toastr.error('Invalid event ID', 'Error');
        }
    }
    

  
    viewEventDetails(eventId: number): void {
        this.eventService.getEventById(eventId).subscribe(
          (eventData) => {
            console.log(eventData);
            this.router.navigate(['/event-details', eventId]);
          },
          (error) => {
            console.error('Error fetching event details:', error);
          }
        );
    }
    


}