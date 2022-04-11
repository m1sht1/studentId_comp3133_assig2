import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddedListingComponent } from './view-added-listing.component';

describe('ViewAddedListingComponent', () => {
  let component: ViewAddedListingComponent;
  let fixture: ComponentFixture<ViewAddedListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAddedListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddedListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
