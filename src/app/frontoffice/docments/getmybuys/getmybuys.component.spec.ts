import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetmybuysComponent } from './getmybuys.component';

describe('GetmybuysComponent', () => {
  let component: GetmybuysComponent;
  let fixture: ComponentFixture<GetmybuysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetmybuysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetmybuysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
