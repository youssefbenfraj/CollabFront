import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDocumentByIdDialogComponent } from './get-document-by-id-dialog.component';

describe('GetDocumentByIdDialogComponent', () => {
  let component: GetDocumentByIdDialogComponent;
  let fixture: ComponentFixture<GetDocumentByIdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetDocumentByIdDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetDocumentByIdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
