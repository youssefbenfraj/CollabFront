import { Component, OnInit } from '@angular/core';
import { Document } from '../../../models/Document.model';
import { DocumentService } from '../../../services/document.service';
import { GetDocumentByIdDialogComponent } from '../get-document-by-id-dialog/get-document-by-id-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentDialogComponent } from '../add-document-dialog/add-document-dialog.component';

@Component({
  selector: 'app-mydocuments',
  templateUrl: './mydocuments.component.html',
  styleUrls: ['./mydocuments.component.css']
})
export class MydocumentsComponent implements OnInit {
  documents: Document[] = [];
  userData: any;
  displayedDocuments: Document[] = [];
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;
  pages: number[] = [];

  constructor(private documentService: DocumentService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUserDocuments();
  }

  loadUserDocuments(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
    const userId = this.userData.idUser;
    this.documentService.getMyDocs(userId).subscribe(
      (res) => {
        this.documents = res;
        this.totalPages = Math.ceil(this.documents.length / this.itemsPerPage);
        this.updatePages();
        this.updateDisplayedDocuments();
      },
      error => console.error('Error fetching documents:', error)
    );
  }

  openGetDocumentByIdDialog(idDoc: number): void {
    const dialogRef = this.dialog.open(GetDocumentByIdDialogComponent, {
      width: '500px',
      data: idDoc
    });

    dialogRef.afterClosed().subscribe(result => {
      // Check for specific success signals from the dialog
      if (result === true || result === 'success') {
        this.loadUserDocuments();  // Refresh the list to reflect changes
      }
    });
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

  openAddDocumentDialog(): void {
    const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadUserDocuments();
      }
    });
  }
}
