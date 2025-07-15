import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormsLayoutComponent } from './user-forms-layout.component';

describe('UserFormsLayoutComponent', () => {
  let component: UserFormsLayoutComponent;
  let fixture: ComponentFixture<UserFormsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
