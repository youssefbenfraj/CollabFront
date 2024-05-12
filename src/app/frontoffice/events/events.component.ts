import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: { idEvent: number;
     titleEvent: string;
    photoUrl: string; 
    nbMaxInscrits: number; 
    location:  string; 
    duree: string; 
    dateEvent: Date; 
    prerequis: string; 
  
    averageRating: number; 
    cout: number; 
    formateurs: string;
    category: string;
    modalitesParticipation: string;
    latitude: number; 
    longitude: number; 
    userList: { idUser: number }[]; // Include userList property

  
  }[] = [];
  searchQuery: string = '';
userData: any;
  modalService: any;
idEvent: any;
totalItems: number = 0; // Total number of items
  pageSize: number = 4; // Number of items per page, adjust as needed
  currentPage: number = 0;// Current page index
selectedCategories: { [key: string]: boolean } = {};
eventDetails: any;
allEvents: any[] = []; 
categories: string[] = [];
distinctPrerequis: string[] | undefined;

currentUser: { id: number } | null = null;   
constructor(private eventService: EventService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }
  eventEdit: any = { idEvent: null }; // Initialize eventEdit with idEvent
  ngOnInit(): void {
    this.loadEvents();
    this.getCurrentUser();
    this.loadCategories();
    this.initializeSelectedCategories()
    this.loadData();
    this.loadDistinctPrerequis();
     this.applyValidationStyles();
  }
  loadEventDetails(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe(
      (eventDetails: any) => {
        this.eventDetails = eventDetails;
        // Ensure that eventDetails contains latitude and longitude properties
        if (eventDetails.latitude !== undefined && eventDetails.longitude !== undefined) {
          // Update center coordinates with event location
         
        } else {
          console.error('Latitude or longitude is missing in event details:', eventDetails);
        }
      },
      error => {
        console.error('Error fetching event details:', error);
      }
    );
  }
  loadData(): void {
    // Ensure events data is loaded before pagination
    if (this.events && this.events.length > 0) {
      // Fetch data from your service, passing pagination parameters
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
  
      this.events = this.events.slice(startIndex, endIndex);
      this.totalItems = this.events.length;
    }}

 
  initializeSelectedCategories(): void {
    // Initialize selectedCategories object with categories set to false
    this.categories.forEach(category => {
      this.selectedCategories[category] = false;
    });
  }
  toggleCategorySelection(category: string): void {
    // Set the selected state of the category to true
    this.selectedCategories[category] = true;
  }
  

  loadCategories(): void {
    this.eventService.getDistinctCategories().subscribe(
      (categories: string[]) => {
        this.categories = categories;
        this.categories.forEach(category => {
          this.selectedCategories[category] = false;
        });
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
filterEvents(): void {
  console.log('Filtering events...');
  console.log('Selected categories:', this.selectedCategories);
  const selectedCategories = Object.keys(this.selectedCategories).filter(category => this.selectedCategories[category]);



  if (selectedCategories.length === 0) {
      this.loadEvents();
  } else {
      // Fetch events for each category
      const eventPromises = selectedCategories.map(category => {
          return this.eventService.getEventsByCategory(category).toPromise();
      });

      Promise.all(eventPromises)
          .then((allEventsArrays: (any[] | undefined)[]) => {
              // Filter out any undefined results
              const validArrays = allEventsArrays.filter(array => array !== undefined) as any[][];
              // Combine all the arrays into one using flat()
              const allEvents = validArrays.flat();
              // Update the events array with the combined results
              this.events = allEvents;
          })
          .catch(error => {
              console.error('Error fetching events:', error);
          });
  }
}
loadDistinctPrerequis(): void {
  this.eventService.getDistinctPrerequis().subscribe(
      (prerequis: string[]) => {
          this.distinctPrerequis = prerequis;
      },
      (error: any) => {
          console.error('Error fetching distinct prerequis:', error);
      }
  );
}

filterByPrerequis(prerequis: string): void {
  this.eventService.getEventsByPrerequis(prerequis).subscribe(
    (filteredEvents: any[]) => {
      this.events = filteredEvents; // Update events with the filtered events
    },
    (error: any) => {
      console.error('Error fetching events by prerequisite:', error);
    }
  );
}




  
  getCurrentUser(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        this.userData = JSON.parse(storedUserData);
        console.log('current user:', this.userData);
        
        if ('idUser' in this.userData) {
            const userId = this.userData.idUser; // Extracting idUser from userData
            console.log('User ID:', userId);
            // Assigning idUser to currentUser.id
            this.currentUser = { id: userId }; // assuming currentUser is of type User
        } else {
            console.log('No user ID found in userData');
        }
    } else {
        console.log('No user data found in localStorage');
    }
}

loadPage(): void {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
  this.events = this.allEvents.slice(startIndex, endIndex); // Ensure allEvents holds all fetched events
}




onPageChange(event: PageEvent): void {
  this.currentPage = event.pageIndex;
  this.loadPage(); // This should trigger the view to update with new data
}


// Calculate the current page number displayed to the user
getCurrentPageNumber(): number {
  return this.currentPage + 1;
}


  
  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: any[]) => {
        this.events = events.map(event => {
          return {
            idEvent: event.idEvent,
            titleEvent: event.titleEvent,
            photoUrl: event.photoUrl,
            nbMaxInscrits: event.nbMaxInscrits,
            location: event.location,
            duree: event.duree,
            dateEvent: event.dateEvent,
            prerequis: event.prerequis,
            averageRating: event.averageRating,
            cout: event.cout,
            formateurs: event.formateurs,
            category: event.category,
            modalitesParticipation: event.modalitesParticipation,
            latitude: event.latitude,
            longitude: event.longitude,
            userList: event.userList, 
             
          };
          
        });
        console.log(this.events);
        this.allEvents = events; // Store all events in allEvents
      this.totalItems = this.allEvents.length; // Update totalItems based on all events
      this.loadPage();  // This should be the total count from all events
        this.loadPage();
            },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  } 
  viewEventDetails(eventId: number): void {
    this.router.navigate(['/eventinfo', eventId]);
  }
  



  eventForm: FormGroup = this.formBuilder.group({
   
      titleEvent: ['', [Validators.required]],
      dateEvent: ['', [Validators.required]],
      description: ['', [Validators.required]],
      nbMaxInscrits: ['', [Validators.required]],
      location: ['', Validators.required], 
      duree: ['', Validators.required],
      formateurs: [''],
      modalitesParticipation: ['', Validators.required],
      cout: ['', Validators.required],
      category: ['', Validators.required],
      prerequis: ['', Validators.required],
      latitude: [''], // Not required
      longitude: [''], // Not required

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
        cout: number | null = null;
        latitude: number| null = null; 
    longitude: number| null = null;
  
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
            latitude: this.latitude,
            longitude: this.longitude,
           
          };
        
          // Call the addEvent service function with the idUser parameter
          this.eventService.addEvent(eventData, idUser).subscribe(
            (addedEvent: any) => {
              console.log('Event added:', addedEvent);
              this.toastr.success('Event added successfully');
                      this.assignEventToUser(idUser, addedEvent.idEvent);
                      this.loadEvents();
                      this.router.navigate(['/events']);
            },
            (error) => {
              console.error('Failed to add event:', error);
              this.toastr.error('Failed to add event. Please try again later.');
            }
          );
        }
        
        assignEventToUser(idUser: number, idEvent: number): void {
          this.eventService.assignUserToEvent(idUser, idEvent).subscribe(
            (response: any) => {
              console.log('User assigned to event:', response);
            },
            (error) => {
              console.error('Failed to assign user to event:', error);
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
                  this.loadEvents(); // Met à jour la liste des événements après la suppression
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

      selectEventForEdit(event: any): void {
        this.eventEdit = { ...event };
      }
    
      updateEvent(): void {
        const eventData = {
          titleEvent: this.eventEdit.titleEvent,
          dateEvent: this.eventEdit.dateEvent,
          description: this.eventEdit.description,
          nbMaxInscrits: this.eventEdit.nbMaxInscrits,
          location: this.eventEdit.location,
          formateurs: this.eventEdit.formateurs,
                };
    
        if (this.eventEdit.idEvent && this.eventEdit.idEvent !== 0) {
          this.eventService.updateEvent(this.eventEdit.idEvent, eventData).subscribe(
            (updatedEventData: any) => {
              console.log('Event updated successfully:', updatedEventData);
              this.toastr.success('Event updated successfully');
              this.loadEvents(); // Reload events after updating
            },
            (error) => {
              console.error('Error updating event:', error);
              this.toastr.error('Failed to update event. Please try again later.');
            }
          );
        } else {
          console.error('Invalid event ID:', this.eventEdit.idEvent);
          this.toastr.error('Invalid event ID', 'Error');
        }
      }
      clearFilters(): void {
        for (const category in this.selectedCategories) {
          this.selectedCategories[category] = false;
        }
            this.filterEvents();
      }

      filterMyEvents(): void {
        if (this.currentUser?.id) {
            if (this.allEvents) {
                this.events = this.allEvents.filter(event => this.currentUser && event.userList?.length && this.currentUser.id === event.userList[0]?.idUser);
                

            } else {
                console.warn('No events are loaded to filter');
            }
        } else {
            console.warn('No current user is logged in to filter events');
        }
    }
    
    
    
    


    }