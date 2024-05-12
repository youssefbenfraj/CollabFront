import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../models/books.model';

@Component({
  selector: 'app-update-book-dialog',
  templateUrl: './update-book-dialog.component.html',
  styleUrls: ['./update-book-dialog.component.css']
})
export class UpdateBookDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) {
    console.log('Data received in dialog:', data);  // Vérifiez les données reçues ici
  }

  onSave(): void {
    this.dialogRef.close(this.data.book);
  }

  onNoClick(): void {
    this.dialogRef.close();
    
  }
  
  
  

  
  
}

