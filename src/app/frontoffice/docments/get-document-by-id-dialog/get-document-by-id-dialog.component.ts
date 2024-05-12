import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Document } from '../../../models/Document.model';
import { DocumentService } from '../../../services/document.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditDocumentDialogComponent } from '../edit-document-dialog/edit-document-dialog.component';
import { FileUploadService } from '../../../services/file-upload.service';
import { BuysService } from '../../../services/buys.service';

@Component({
  selector: 'app-get-document-by-id-dialog',
  templateUrl: './get-document-by-id-dialog.component.html',
  styleUrls: ['./get-document-by-id-dialog.component.css']
})
export class GetDocumentByIdDialogComponent {
  document!: Document;
  files: string[] = [];
  nb!:number;
  totprice!:number;
  constructor(
    private dialogRef: MatDialogRef<GetDocumentByIdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public idDoc: number,
    private documentService: DocumentService,
    private fileService:FileUploadService,
    public dialog: MatDialog,
    private buyService:BuysService
  ) {
    console.log("a");
    console.log(this.idDoc);
    // Fetch document details by id
    this.documentService.retrieveById(this.idDoc).subscribe(
      (data: Document) => {
        this.document = data;
      },
      (error) => {
        console.error('Error fetching document:', error);
      }
    );
    this.fileService.listFiles(this.idDoc).subscribe({
      next: (data) => {
        this.files = data;
      },
      error: (error) => console.error('Error retrieving files:', error)
    });
    this.buyService.getNbrVente(this.idDoc).subscribe(
      (res)=>{
        this.nb=res;
        this.totprice=this.nb*this.document.price;
      }
    )
  }

  onClose(): void {
    this.dialogRef.close();
  }
  onDelete(): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this document?'
      }
    });

    confirmDialog.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.documentService.deleteDocument(this.idDoc).subscribe(() => {
          this.dialogRef.close(true);
        }, (error) => {
          console.error('Error deleting document:', error);
        });
      }
    });
  }
  onEdit(): void {
    const editDialog = this.dialog.open(EditDocumentDialogComponent, {
      width: '400px',
      data: this.document // Passez le document à éditer au dialogue d'édition
    });

    editDialog.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.documentService.retrieveById(this.idDoc).subscribe(
          (updatedDocument: Document) => {
            this.document = updatedDocument;
          },
          (error) => {
            console.error('Error fetching updated document:', error);
          }
        );
      }
    });
  }
  fileUrl(fileName: string): string {
    return `http://localhost:8087/uploads/${fileName}`;
  }
  
  displayDocument(fileData: Blob): void {
    const fileURL = URL.createObjectURL(fileData);
    window.open(fileURL, '_blank');
  }
}
