import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewListingComponent } from './addnew-listing.component';

describe('AddnewListingComponent', () => {
  let component: AddnewListingComponent;
  let fixture: ComponentFixture<AddnewListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
