import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAddComponent } from './comp-add.component';

describe('CompAddComponent', () => {
  let component: CompAddComponent;
  let fixture: ComponentFixture<CompAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
