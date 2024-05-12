import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookDialogComponent } from './update-book-dialog.component';

describe('UpdateBookDialogComponent', () => {
  let component: UpdateBookDialogComponent;
  let fixture: ComponentFixture<UpdateBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBookDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
