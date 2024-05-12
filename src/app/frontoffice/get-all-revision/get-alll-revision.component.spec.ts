import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAlllRevisionComponent } from './get-alll-revision.component';

describe('GetAlllRevisionComponent', () => {
  let component: GetAlllRevisionComponent;
  let fixture: ComponentFixture<GetAlllRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAlllRevisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAlllRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
