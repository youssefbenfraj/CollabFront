import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions, EventInput } from '@fullcalendar/core';

import { EventService } from '../../services/event.service';
import { AppEvent } from './event.model'; // Make sure this path is correct

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions;
  calendarEvents: EventInput[] = [];
  idUser: number | undefined;
  userData: any;

  constructor(private eventService: EventService) {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      weekends: true,
      events: this.calendarEvents,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this)
    };
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('User data from localStorage:', this.userData);
      
      this.idUser = this.userData.idUser;
      if (this.idUser) {
        console.log('User ID:', this.idUser);
        this.loadEvents(); // Load events after confirming the user ID
      } else {
        console.error('Invalid user ID:', this.idUser);
      }
    } else {
      console.error('No user data found in localStorage');
    }
  }
  
  loadEvents(): void {
    if (this.idUser) {
      this.eventService.getReservedEvents(this.idUser).subscribe((events: AppEvent[]) => {
        console.log('Loaded Events:', events);
        this.calendarEvents = events.map(event => ({
          title: event.titleEvent,
          start: event.dateEvent,
          allDay: true
        }));
        this.updateCalendarOptions();
      });
    } else {
      console.error('User ID is undefined. Cannot load events.');
    }
  }

  updateCalendarOptions(): void {
    this.calendarOptions.events = this.calendarEvents;
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }

  handleEventClick(arg: any) {
    alert('event click! ' + arg.event.title);
  }
}
