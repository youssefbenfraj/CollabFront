import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Modules } from '../../../models/modules.model';
import { Niveau } from '../../../models/Niveau.model';
import { ModulesService } from '../../../services/modules.service';

@Component({
  selector: 'app-add-module-dialog',
  templateUrl: './add-module-dialog-component.component.html',
  styleUrls: ['./add-module-dialog-component.component.css'],
})
export class AddModuleDialogComponentComponent {
  newModule: Modules = {
    idM: 0,
    nomModule: '',
    niveau: Niveau.Premiére_Prepa // Initialize with a default Niveau value
  };

  niveaux: Niveau[] = Object.values(Niveau).filter(value => typeof value === 'string') as Niveau[];

  constructor(
    private dialogRef: MatDialogRef<AddModuleDialogComponentComponent>,
    private modulesService: ModulesService
  ) {}

  onSubmit(): void {
    if (!this.isFormValid()) {
      console.error('Module form is invalid');
      return;
    }

    this.modulesService.addModules(this.newModule).subscribe({
      next: (addedModule) => {
        console.log('Module added successfully:', addedModule);
        this.dialogRef.close('success');
      },
      error: (error: any) => {
        console.error('Error adding module:', error);
      }
    });
  }

  isFormValid(): boolean {
    return !!this.newModule.nomModule.trim() && this.newModule.niveau !== null;
  }
}
