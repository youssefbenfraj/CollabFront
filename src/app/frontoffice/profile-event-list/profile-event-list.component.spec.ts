import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEventListComponent } from './profile-event-list.component';

describe('ProfileEventListComponent', () => {
  let component: ProfileEventListComponent;
  let fixture: ComponentFixture<ProfileEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEventListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
