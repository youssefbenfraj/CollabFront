import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSideBarComponent } from './profile-side-bar.component';

describe('ProfileSideBarComponent', () => {
  let component: ProfileSideBarComponent;
  let fixture: ComponentFixture<ProfileSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
