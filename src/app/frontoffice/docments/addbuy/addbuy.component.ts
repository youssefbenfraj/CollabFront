import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BuysService } from '../../../services/buys.service';
import { DocumentComponent } from '../document/document.component';
import { Document } from '../../../models/Document.model';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Buys } from '../../../models/Buys.model';
import { DocumentService } from '../../../services/document.service';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GetDocumentByIdDialogComponent } from '../get-document-by-id-dialog/get-document-by-id-dialog.component';
import { GetmybuysComponent } from '../getmybuys/getmybuys.component';

@Component({
  selector: 'app-addbuy',
  templateUrl: './addbuy.component.html',
  styleUrl: './addbuy.component.css'
})
export class AddbuyComponent implements OnInit{
  b!:Buys[];
  u!:User;
  documents:Document[] = [];
  userData:any;
  displayedDocuments: Document[] = []; 
  currentPage = 1;
  itemsPerPage = 9; 
  totalPages = 1;
  pages: number[] = [];

  constructor(private router:Router,private buyService:BuysService,private userService:UserService,private documentService:DocumentService,private authService:AuthService
    ,public dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.buyService.createbuy2().subscribe(
      (result)=>{
        this.userService.getUserById(1).subscribe(
          (result2)=>{
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
            this.userData = JSON.parse(storedUserData);
       }
            console.log(this.userData);
            const userId = this.userData.idUser;
            console.log(userId);
            this.buyService.getDocsByUser(userId).subscribe((res3)=>{
              this.b=res3;
              this.b.forEach(element => {
                this.documentService.retrieveById(element.document.idDoc).subscribe((res4)=>{
                  this.documents.push(res4);
                })
              });
            })
          }
        )
      }
    )
    }
    updatePages(): void {
      this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    }
  
    goToPage(page: number, event: Event): void {
      event.preventDefault(); 
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updateDisplayedDocuments();
      }
    }  
  
    updateDisplayedDocuments(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.documents.length);
      this.displayedDocuments = this.documents.slice(startIndex, endIndex);
    }
  
    openGetDocumentByIdDialog(idDoc: number): void {
      const dialogRef = this.dialog.open(GetmybuysComponent, {
        width: '500px' ,
        data: idDoc
      });


}
}
