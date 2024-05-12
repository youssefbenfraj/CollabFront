import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  eventEdit: any = { 
    idEvent: 0,
    titleEvent: '',
    dateEvent: '',
    description: '',
    // Ajoutez d'autres propriétés d'événement selon vos besoins
  };
 
  
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['eventId']; // Supposant que vous passez eventId dans la route
    this.eventService.getEventById(eventId).subscribe(
      (eventData) => {
        this.eventEdit = eventData;
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  }

  updateEvent(): void {
    this.eventService.updateEvent(this.eventEdit.idEvent, this.eventEdit).subscribe(
      (updatedEventData) => {
        console.log('Event updated successfully:', updatedEventData);
        this.toastr.success('Event updated successfully', 'Success');
      },
      (error) => {
        console.error('Error updating event:', error);
        this.toastr.error('Failed to update event', 'Error');
      }
    );
  }
}
