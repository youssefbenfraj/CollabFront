import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Document } from '../../../models/Document.model';
import { DocumentService } from '../../../services/document.service';
import { UserService } from '../../../services/user.service';
import { ModulesService } from '../../../services/modules.service';
import { Modules } from '../../../models/modules.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-document-dialog',
  templateUrl: './edit-document-dialog.component.html',
  styleUrls: ['./edit-document-dialog.component.css']
})
export class EditDocumentDialogComponent implements OnInit {
  editedDocument: Document;
  userData: any;
  userId!: number;
  user!: User;
  modules: Modules[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Document,
    private documentService: DocumentService,
    private userService: UserService,
    private moduleService: ModulesService
  ) {
    this.editedDocument = { ...data };
  }

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      this.userId = this.userData.idUser;
      this.userService.getUserById(this.userId).subscribe(
        (res) => {
          this.user = res;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }

    this.moduleService.getAllModules().subscribe(
      (modules) => {
        this.modules = modules;
      },
      (error) => {
        console.error('Error fetching modules:', error);
      }
    );
  }

  onSubmit(): void {
    this.documentService.updateDocument(this.editedDocument, this.userId).subscribe({
      next: () => {
        console.log('Document updated successfully');
        this.dialogRef.close('success');
      },
      error: (error) => {
        console.error('Error updating document:', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
