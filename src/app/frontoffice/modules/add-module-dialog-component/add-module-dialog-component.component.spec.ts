import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModuleDialogComponentComponent } from './add-module-dialog-component.component';

describe('AddModuleDialogComponentComponent', () => {
  let component: AddModuleDialogComponentComponent;
  let fixture: ComponentFixture<AddModuleDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddModuleDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddModuleDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
