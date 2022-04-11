import { Component, Injectable, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable,Subscription } from 'rxjs';
import { BookingModel } from '../models/booking.model';


const BOOKED_LISTINGS = gql`
query($username: String!){
  viewUserBookings(username: $username) {
    listing_id
    booking_id
    booking_date
    booking_start
    booking_end
  }
}

`;


@Injectable({
  providedIn: 'root'
})
class ViewBookedListingService {
  constructor(private apollo: Apollo) {}

  getBooking(username: String) {
    return this.apollo.watchQuery({
      query: BOOKED_LISTINGS,
      variables: {
        username,
      }
    });
  }
}


@Component({
  selector: 'app-booked-listing',
  templateUrl: './booked-listing.component.html',
  styleUrls: ['./booked-listing.component.css']
})
export class BookedListingComponent implements OnInit {

  loading = true;
  listings: any;

  private querySubscription!: Subscription;
  user!: string;
  constructor(private apollo: Apollo,private viewBookedListingService: ViewBookedListingService) { }

  ngOnInit(): void {

    let token = localStorage.getItem('token')
    this.user = token? JSON.parse(atob(token.split('.')[1])).username : "guest"
    if (this.user === "guest"){
      
    }
    else{
      
      this.viewBookedListingService.getBooking(this.user)
      .valueChanges
      .subscribe(({ data }) => {
        this.listings = data;
        console.log('got data', data);

        this.listings = this.listings.viewUserBookings;

      }, (error) => {
        console.log('there was an error sending the query', error);
      });
    }
        
       
  }
}
