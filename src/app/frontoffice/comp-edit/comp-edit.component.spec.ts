import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompEditComponent } from './comp-edit.component';

describe('CompEditComponent', () => {
  let component: CompEditComponent;
  let fixture: ComponentFixture<CompEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
