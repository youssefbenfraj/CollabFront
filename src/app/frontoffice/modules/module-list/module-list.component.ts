import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../../../services/modules.service';
import { Modules } from '../../../models/modules.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AddModuleDialogComponentComponent } from '../add-module-dialog-component/add-module-dialog-component.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  modules: Modules[] = [];


  constructor(private moduleService: ModulesService, public dialog: MatDialog, private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchModules();
  }

  fetchModules(): void {
    this.moduleService.getAllModules().subscribe((data: Modules[]) => {
      this.modules = data;
    });
  }
 openAddModuleDialog(): void {
    const dialogRef = this.dialog.open(AddModuleDialogComponentComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.fetchModules(); // Refresh modules after adding
      }
    });
  }
  confirmDelete(module: Modules): void {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete the module '${module.nomModule}'?`
      }
    });

    confirmDialog.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteModule(module); // Appeler la méthode de suppression si confirmation
      }
    });
  }

  deleteModule(module: Modules): void {
    this.moduleService.deleteModules(module.idM).subscribe(() => {
      // Rafraîchir la liste des modules après suppression
      this.fetchModules();
    }, (error) => {
      console.error('Error deleting module:', error);
    });
  }




  navigateToquiz(): void {
    this.router.navigate(['/welcome']);
  }
  
}
