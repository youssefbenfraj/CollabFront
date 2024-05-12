import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEventEditComponent } from './profile-event-edit.component';

describe('ProfileEventEditComponent', () => {
  let component: ProfileEventEditComponent;
  let fixture: ComponentFixture<ProfileEventEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileEventEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
