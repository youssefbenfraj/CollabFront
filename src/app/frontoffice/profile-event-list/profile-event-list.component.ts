import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-event-list',
  templateUrl: './profile-event-list.component.html',
  styleUrl: './profile-event-list.component.css'
})
export class ProfileEventListComponent implements OnInit {
  events:any[] = [];
  idUser: number | undefined;

  constructor(private eventService: EventService,
     private toastr: ToastrService, 
     private router: Router,
     private userService: UserService,
     private authService: AuthService,
     private datePipe: DatePipe, private formBuilder: FormBuilder,) {}
  userData: any;
  ngOnInit(): void {
    this.fetchEvents();
    this.fetchUserData();
    this.applyValidationStyles();
    if (this.userData && this.userData.idUser) {
      this.idUser = this.userData.idUser;
    }
  }
  fetchUserData(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('User data from localStorage:', this.userData);
      // Assign idUser from userData to idUser property of the component
      this.idUser = this.userData.idUser; // Assuming idUser is the correct property name
    }
    
    const userId = this.authService.userId;
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (response) => {
          this.userData = response;
          localStorage.setItem('userData', JSON.stringify(response));
          console.log('User data from API:', this.userData);
          // Assign idUser from userData to idUser property of the component
          this.idUser = this.userData.idUser; // Assuming idUser is the correct property name
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } 
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
                const url = `/eventEdit/${idEvent}`; // Generate URL
                console.log('Navigating to:', url); // Log generated URL
                this.router.navigate(['/eventEdit', idEvent]); // Redirect to the event edit page
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
eventForm: FormGroup = this.formBuilder.group({
  titleEvent: ['', [Validators.required]],
  dateEvent: ['', [Validators.required]],
  description: ['',[Validators.required]],
  nbMaxInscrits: ['', [Validators.required]],
  location: [''],
  duree: [''],
  formateurs: [''],
  modalitesParticipation: [''],
  cout: [''],
  category: [''],
});
selectedFile: File | null = null;
titleEvent: string = '';
description: string = '';
nbMaxInscrits: number | null = null;
dateEvent:  Date | null = null;
location: string = '';
duree: string = '';
category: string = '';
formateurs: string = '';
      modalitesParticipation: string = '';
      prerequis: string = '';

      onSubmit(idUser: number): void {
        const formattedDateEvent = this.formatDateEvent();
        
        const eventData = {
          titleEvent: this.titleEvent,
          description: this.description,
          nbMaxInscrits: this.nbMaxInscrits,
          dateEvent: formattedDateEvent,
          location: this.location,
          duree: this.duree,
          category: this.category,
          image: this.selectedFile,
          formateurs: this.formateurs,
          modalitesParticipation: this.modalitesParticipation,
          prerequis: this.prerequis,
        };
      
        // Call the addEvent service function
        this.eventService.addEvent(eventData, idUser).subscribe(
          (addedEvent) => {
            console.log('Event added:', addedEvent);
            this.toastr.success('Event added successfully');
      
            // After the event is successfully added, assign the user to the event
            this.eventService.assignUserToEvent(idUser, addedEvent.idEvent).subscribe(
              () => {
                console.log('User assigned to event successfully', 'idUser:', idUser, 'idEvent:', addedEvent.idEvent);
                this.router.navigate(['/EventListUser']); // Redirect to event list page after successful addition
              },
              (error) => {
                console.error('Failed to assign user to event:', error);
                this.toastr.error('Failed to assign user to event. Please try again later.');
              }
            );
          },
          (error) => {
            console.error('Failed to add event:', error);
            this.toastr.error('Failed to add event. Please try again later.');
          }
        );
      }
      
      
      
    
      
      
      
      onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        this.selectedFile = file;
      }
    
      applyValidationStyles() {
        const eventForm = document.querySelectorAll('.needs-validation');
        Array.from(eventForm).forEach((form: any) => {
          form.addEventListener('submit', (event: Event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          });
        });
      }
      formatDateEvent(): Date | null {
        if (this.dateEvent) {
            return new Date(this.dateEvent);
        } else {
            return null;
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