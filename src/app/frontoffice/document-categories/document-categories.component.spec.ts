import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCategoriesComponent } from './document-categories.component';

describe('DocumentCategoriesComponent', () => {
  let component: DocumentCategoriesComponent;
  let fixture: ComponentFixture<DocumentCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
