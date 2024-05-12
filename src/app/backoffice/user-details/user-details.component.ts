import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'] 
})
export class UserDetailsComponent implements OnInit {
  userDetails: any;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['userId'];
      this.userService.getUserById(userId).subscribe(
        (userData) => {
          this.userDetails = userData; // Assign fetched user data to userDetails
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    });
  }
}
