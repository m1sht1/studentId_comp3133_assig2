import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedListingComponent } from './booked-listing.component';

describe('BookedListingComponent', () => {
  let component: BookedListingComponent;
  let fixture: ComponentFixture<BookedListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
