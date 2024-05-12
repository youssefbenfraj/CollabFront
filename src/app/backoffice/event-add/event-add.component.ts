import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent {
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

  constructor(
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private authService: AuthService,
  ) {
  }

  onSubmit(): void {
    // Get the current user's ID asynchronously
    this.authService.getCurrentUserId().subscribe(
        (userId) => {
            const formattedDateEvent = this.formatDateEvent();
    
            const eventData = {
              titleEvent: this.titleEvent,
              description: this.description,
              nbMaxInscrits:this.nbMaxInscrits,
              dateEvent: formattedDateEvent,
              location: this.location,
              duree: this.duree,
              category: this.category,
              image: this.selectedFile,
              formateurs: this.formateurs,
              modalitesParticipation: this.modalitesParticipation,
              prerequis: this.prerequis,
            };
    
            // Pass userId as the second argument
            this.eventService.addEvent(eventData, userId).subscribe(
              (addedEvent) => {
                console.log('Event added:', addedEvent);
                this.toastr.success('Event added successfully');
                this.router.navigate(['/listevent']); // Redirect to event list page after successful addition
              },
              (error) => {
                console.error('Failed to add event:', error);
                this.toastr.error('Failed to add event. Please try again later.');
              }
            );
        },
        (error) => {
            console.error('Failed to get current user ID:', error);
            // Handle error retrieving user ID
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

  ngOnInit() {
    this.applyValidationStyles();
  }
  formatDateEvent(): Date | null {
    if (this.dateEvent) {
        return new Date(this.dateEvent);
    } else {
        return null;
    }

  }
}