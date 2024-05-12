import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Document } from '../../../models/Document.model';
import { DocumentService } from '../../../services/document.service';
import { FileUploadService } from '../../../services/file-upload.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ModulesService } from '../../../services/modules.service';
import { Modules } from '../../../models/modules.model';

@Component({
  selector: 'app-add-document-dialog',
  templateUrl: './add-document-dialog.component.html',
  styleUrls: ['./add-document-dialog.component.css'],
})
export class AddDocumentDialogComponent implements OnInit{
  newDocument: Document = new Document();
  selectedFile: File | null = null;
  userData:any;
  userId!:number;
  user!:User;
  modules: Modules[] = []; // Array to store modules

  constructor(
    private dialogRef: MatDialogRef<AddDocumentDialogComponent>,
    private documentService: DocumentService,
    private fileUploadService: FileUploadService,
    private userService:UserService,
    private moduleService: ModulesService

  ) { }
  ngOnInit(): void {
  
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      this.userId = this.userData.idUser;
      this.userService.getUserById(this.userId).subscribe(
        (res)=>{
          this.user=res;
        }
      )
    }
    this.moduleService.getAllModules().subscribe(
      (modules) => {
        this.modules = modules;
      },
      (error) => {
        console.error('Error fetching modules:', error);
      }
    );
    console.log(this.userData);
    console.log(this.userId);
  }
  
  files: File[] = [];
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.files = Array.from(input.files);
    }
  }
  onSubmit(): void {
    this.documentService.createDocument(this.newDocument,this.userId).subscribe({
      
      next: (createdDocument: any) => {
        console.log('Document added successfully');
        const idDoc = createdDocument.idDoc;
        if (this.files && idDoc) {
          this.fileUploadService.uploadFiles(idDoc, this.files).subscribe({
            next: () => {
              console.log('File uploaded successfully');
              this.dialogRef.close('success');
            },
            error: (error: any) => {
              console.error('Error uploading file:', error);
            }
          });
        } else {
          this.dialogRef.close('success');
        }
      },
      error: (error: any) => {
        console.error('Error adding document:', error);
      }
    });
  }
}
