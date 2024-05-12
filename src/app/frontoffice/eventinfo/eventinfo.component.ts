import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Rating } from './rating.model';
import { Reservation } from './reservation.model';
import { circle, latLng, MapOptions, marker, polygon, tileLayer } from 'leaflet';

import { IgcRatingComponent, defineComponents } from 'igniteui-webcomponents';
defineComponents(IgcRatingComponent);


@Component({
  selector: 'app-eventinfo',
  templateUrl: './eventinfo.component.html',
  styleUrls: ['./eventinfo.component.css']
})
export class EventinfoComponent implements OnInit , AfterViewInit {
  reservation: Reservation = {};
  eventId: number | undefined;
  eventDetails: any;
  content: string = '';
  idUser: number | undefined;
  userData: any;
  ratingValue: number = 0;
  averageRating: number = 0;
  phoneNumber: string = '';
  ratings: Rating[] = [];
  comments: { 
    idC: number,
    content: string, 
    user: { 
      idUser: number, 
      firstName: string,
      lastName: string,
      imageUser: string
    }
  }[] = [];
totalReviews: any;
Math: any;
event = {
  title: "Example Event",
  date: "2024-04-30",
  description: "This is an example event.",
  url: "http://yourwebsite.com/events/example"
};
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {  
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize')); // Trigger window resize event
    }, 0);
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventIdParam = params.get('eventId');
      if (eventIdParam !== null) {
        this.eventId = +eventIdParam;
        this.loadEventDetails(this.eventId);
        this.getAllCommentsForEvent(this.eventId); 
        this.fetchComments(); 
        this.getAllRatingsForEvent(this.eventId); 
        this.fetchRatings();
        this.fetchAverageRatingForEvent(this.eventId);
      } else {
        console.error('Event ID parameter is null');
      } 
    });
    this.fetchUserData();
    this.fetchComments(); 
    this.fetchRatings();
    console.log('Event details:', this.eventDetails);


  }
  layers = [
    circle([ 46.95, -122 ], { radius: 5000 }),
    polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
    marker([ 46.879966, -121.726909 ])
  ];
  mapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 12,
    center: [46.95, -122]// Default center coordinates
  };
  floor(value: number): number {
    return Math.floor(value);
  }
  fetchAverageRatingForEvent(eventId: number): void {
    this.eventService.getAverageRatingForEvent(eventId).subscribe(
      (averageRating: number) => {
          this.averageRating = averageRating;
      },
      error => {
          console.error('Error fetching average rating:', error);
      }
  );
  }
  fetchUserData(): void {
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('User data from localStorage:', this.userData);
      
      this.idUser = this.userData.idUser; // Assign user ID to class property
      
      if (this.idUser) {
        console.log('User ID:', this.idUser); // Display user ID in the console
      } else {
        console.error('Invalid user ID:', this.idUser);
      }
    }
    
    // Rest of your method...
  }
  
  fetchComments(): void {
    if (this.eventId !== undefined) {
      this.getAllCommentsForEvent(this.eventId);
    }
  }
  fetchRatings(): void {
    if (this.eventId !== undefined) {
      this.eventService.getAllRatingsForEvent(this.eventId).subscribe(
        (ratings: any[]) => {
          this.ratings = ratings;
          
        },
        error => {
          console.error('Error fetching ratings:', error);
        }
      );
    }
  }

  loadEventDetails(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe(
      (eventDetails: any) => {
        this.eventDetails = eventDetails;
        console.log("Event details loaded:", this.eventDetails); // Detailed log

        if (eventDetails.latitude !== undefined && eventDetails.longitude !== undefined) {
          this.mapOptions.center = latLng(eventDetails.latitude, eventDetails.longitude);
          const eventCircle = circle([eventDetails.latitude, eventDetails.longitude], { radius: 5000 });
          this.layers = [eventCircle];
        } else {
          console.error('Latitude or longitude is missing in event details:', eventDetails);
        }
      },
      error => {
        console.error('Error fetching event details:', error);
      }
    );
  }

  

  addCommentToEvent(): void {
    console.log('Comment content:', this.content);
    // Trim the content and check if it's empty
    const trimmedContent = this.content.trim();
    if (!trimmedContent) {
        console.error('Comment content is empty');
        return;
    }

    if (this.eventId === undefined) {
        console.error('Event ID is undefined');
        return;
    }

    if (this.idUser === undefined) {
        console.error('User ID is undefined');
        return;
    }

    this.eventService.addCommentToEvent(this.eventId, this.idUser, trimmedContent).subscribe(
        (newComment) => {
            console.log('Comment added successfully:', newComment);
            // Add the new comment to the comments array
            this.comments = [...this.comments, newComment];
            // Clear the content textarea
            this.content = '';
        },
        error => {
            console.error('Error adding comment:', error);
        }
    );
}


  
  onRatingChange(rating: number) {
    console.log('Rating changed:', rating);
    if (this.eventId === undefined) {
        console.error('Event ID is not defined');
        return;
    }
    if (this.idUser === undefined) {
        console.error('User ID is undefined');
        return;
    }
    this.eventService.addRatingToEvent(this.eventId, this.idUser, rating).subscribe(
        response => {
            console.log('Rating submitted successfully');
            this.fetchRatings();
          },
        error => {
            console.error('Error submitting rating:', error);
        }
    );
}


  getAllCommentsForEvent(eventId: number): void {
    // Fetch comments for the event
    this.eventService.getAllCommentsForEvent(eventId).subscribe(
      (comments: any[]) => {
        // Map the received data to match the expected structure
        this.comments = comments.map(comment => ({
          idC: comment.idC,
          content: comment.content,
          user: {
            idUser: comment.user.idUser,
            firstName: comment.user.firstName,
            lastName: comment.user.lastName,
            imageUser: comment.user.imageUser
          }
        }));
      },
      error => {
        console.error('Error fetching comments:', error);
      }
    );
  }
  getAllRatingsForEvent(eventId: number): void {
    this.eventService.getAllRatingsForEvent(eventId).subscribe(
      (ratings: Rating[]) => {
        this.ratings = ratings;
        this.fetchRatings();

      },
      error => {
        console.error('Error fetching ratings:', error);
      }
    );
  }
  @ViewChild('reservationModal') reservationModal!: ElementRef;
  addReservation(): void {
    if (this.idUser !== undefined && this.eventId !== undefined) {
      // Show confirmation dialog
      const modal: any = this.reservationModal.nativeElement;
      modal.classList.add('show');
      modal.style.display = 'block';
    } else {
      console.error('userId or eventId is undefined');
    }
  }

  
  confirmReservation(): void {
    if (this.idUser !== undefined && this.eventId !== undefined) {
      // Check if phoneNumber is provided
      if (!this.phoneNumber) {
        this.toastr.error('Please provide your phone number');
        return;
      }
      
      // Call your service to add reservation here
      this.eventService.addReservation(this.idUser, this.eventId, {
        phoneNumber: this.phoneNumber,
        // Add other reservation details here
      }).subscribe(
        (response) => {
          this.toastr.success('Reservation added successfully');
          console.log('Reservation added successfully:', response);
          // Hide modal after confirmation
          const modal: any = this.reservationModal.nativeElement;
          modal.classList.remove('show');
          modal.style.display = 'none';
          // Refresh the page
          window.location.reload();
        },
        (error) => {
          this.toastr.error('Failed to add reservation');
          console.error('Failed to add reservation:', error);
        }
      );
    } else {
      console.error('userId or eventId is undefined');
    }
  }
  
  closeModal(): void {
    const modal: any = this.reservationModal.nativeElement;
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
  getEventShareUrl(eventId: number): string {
    return `http://localhost:4200/eventinfo/${eventId}`;
  }
  shareOnFacebook(): void {
    const url = this.eventDetails.url || this.getEventShareUrl(this.eventDetails.idEvent);
    console.log(url);
    if (!url) {
        console.error('URL is not available for sharing');
        return;
    }
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
}

shareOnTwitter(): void {
    const url = this.eventDetails.url || this.getEventShareUrl(this.eventDetails.idEvent);
    if (!url) {
        console.error('URL is not available for sharing');
        return;
    }
    const text = encodeURIComponent(`${this.eventDetails.titleEvent} on ${this.eventDetails.dateEvent} - Check it out!`);
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`;
    window.open(twitterUrl, '_blank');
}

shareOnLinkedIn(): void {
    const url = this.eventDetails.url || this.getEventShareUrl(this.eventDetails.idEvent);
    if (!url) {
        console.error('URL is not available for sharing');
        return;
    }
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(this.eventDetails.titleEvent)}&summary=${encodeURIComponent(this.eventDetails.description)}`;
    window.open(linkedInUrl, '_blank');
}


}