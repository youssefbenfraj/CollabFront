import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: {
deactivationDate: Date;
active: any; id: number, name: string, email: string,username: string, level: string, major: string, pictureUrl: string ,instagramUsername:string
}[] = [];
Math: any;


  constructor(private userService: UserService,private toastr: ToastrService,private router: Router,) {}
  displayedMembers: any[] = []; 
  pageSize: number = 5; 
  currentPage: number = 1; 
  totalPages: number = 3; 
  pages: number[] = [];
  selectedUserId: number | null = null;
  duration: string = '';
  showModal: boolean = false; 
  ngOnInit(): void {
    this.fetchUsers(); 
   }
   fetchUsers(): void {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users.map(user => {
          return {
            id: user.idUser,
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            username: user.username,
            level: user.level,
            major: user.major,
            instagramUsername: user.instagramUsername,
            classNumber: user.classNumber,
            pictureUrl: user.imageUser ,
            active: user.active ,
            deactivationDate: user.deactivationDate
            
          };
        });
        console.log(this.users);
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  } 

  editStudent(idUser: number): void {
    if (idUser && !isNaN(idUser)) {
      const userData = {}; 
      this.userService.updateUser(idUser, userData).subscribe(
        (response) => {
          this.router.navigate(['/editUser', idUser]); 
          console.log('User updated successfully:', response);
        },
        (error) => {
          console.error('Error updating user details:', error);
        }
      );
    } else {
      console.error('Invalid user ID:', idUser);
    }
  }
  

  deleteUser(id: any) {
    const userId = parseInt(id, 10);
    console.log('Deleting user with ID:', userId);
  
    if (!isNaN(userId)) { 
      if (confirm("Are you sure you want to delete this user?")) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            console.log("User deleted successfully");
            this.toastr.success('User deleted successfully', 'Success');
            this.fetchUsers(); 
          },
          error => {
            console.error('Error deleting user:', error);
            this.toastr.error('Failed to delete user', 'Error');
          }
        );
      }
    } else {
      console.error('Invalid user ID:', id);
      this.toastr.error('Invalid user ID', 'Error');
    }
  }
 
  viewStudentDetails(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (userData) => {
        console.log(userData);
        this.router.navigate(['/user-details', userId]);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  toggleUserActivation(user: any): void {
    const action = user.active ? 'deactivate' : 'reactivate';
    const confirmation = confirm(`Are you sure you want to ${action} this user?`);
    if (confirmation) {
      const userId = user.id;
      const method = user.active ? this.userService.deactivateUser(userId,this.duration) : this.userService.reactivateUser(userId);

      method.subscribe({
        next: () => {
          user.active = !user.active; 
          this.toastr.success(`User ${action}d successfully`);
          this.fetchUsers();
          
        },
        error: (error) => this.toastr.error(`Failed to ${action} user`)
      });
    }
  }
 openDeactivateModal(userId: number): void {
    this.selectedUserId = userId;
    this.showModal = true;
  }

  deactivateUser(): void {
    if (this.selectedUserId && this.duration) {
      this.userService.deactivateUser(this.selectedUserId, this.duration).subscribe({
        next: () => {
          this.closeModal();
          this.fetchUsers();
        },
        error: (error) => {
          console.error('Error deactivating user:', error);
        }
      });
    }
  }


  selectUser(userId: number): void {
    this.selectedUserId = userId;
    console.log('Selected User ID:', this.selectedUserId); // Log the selected user ID to the console
  }

  reactivateUser(id: any): void {
    const userId = parseInt(id, 10);
    console.log('Reactivating user with ID:', userId);
  
    if (!isNaN(userId)) { 
      if (confirm("Are you sure you want to reactivate this user?")) {
        this.userService.reactivateUser(userId).subscribe({
          next: () => {
            console.log("User reactivated successfully");
            this.fetchUsers(); // Reload users to reflect changes
          },
          error: (error) => {
            console.error('Failed to reactivate user:', error);
          }
        });
      }
    } else {
      console.error('Invalid user ID:', id);
      this.toastr.error('Invalid user ID', 'Error');
    }
  }
  
  

  closeModal(): void {
    this.showModal = false; // Set false to hide the modal
  }

  getTimeUntilReactivation(deactivationDate: Date): Observable<string> {
    return interval(1000).pipe(
      startWith(0),
      map(() => {
        const now = new Date();
        const deactivation = new Date(deactivationDate);
        const reactivation = new Date(deactivation.getTime() + (24 * 60 * 60 * 1000)); // assuming 24 hours to reactivate
        const secondsLeft = (reactivation.getTime() - now.getTime()) / 1000;
        
        if (secondsLeft < 0) {
          return "00:00:00";
        }
  
        const hours = Math.floor(secondsLeft / 3600);
        const minutes = Math.floor((secondsLeft % 3600) / 60);
        const seconds = Math.floor(secondsLeft % 60);
  
        return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
      })
    );
  }
  
  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updateDisplayedMembers();
  }

  updateDisplayedMembers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedMembers = this.users.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedMembers();
    }
  }
}
