import { Injectable } from '@angular/core';
import { PopupComponent } from './popup.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) {}
  openPopupA() {
    this.dialog.open(PopupComponent);
  }
}
