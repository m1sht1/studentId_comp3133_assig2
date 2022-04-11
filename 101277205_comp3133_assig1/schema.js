const { typeDefs } = require('graphql');
const { gql } = require('apollo-server-express');
exports.typeDefs = gql `
    type User {
      id: ID!
      username: String!
      firstname:String!
      lastname:String!
      password:String!
      email:String!
      type:String!
      token: String!
    }
    type Listing {
      id: ID!
      listing_id: String!
      listing_title:String!
      description:String!
      street:String!
      city:String!
      postal_code:String!
      price: Float!
      email: String!
      username: String!
    }
    type Booking{
      id:ID!
      listing_id:String!
      booking_id:String!
      booking_date:String!
      booking_start:String!
      booking_end:String!
      username:String!
    }
    type Query {
      viewListings:[Listing]
      searchListingByName(listing_title: String!):[Listing]
      searchListingByCity(city: String!):[Listing]
      searchListingByPostalcode(postal_code: String!):[Listing]
      viewUserBookings(username: String!):[Booking]
      viewListingsAddedByAdmin(username: String!):[Listing]

      login(username:String!,password:String!):User
      
    }
    type Mutation {
      register(
        username: String!
        firstname:String!
        lastname:String!
        password:String!
        email:String!
        type:String!):User  

        
      createListing(
          listing_id: String!
          listing_title:String!
          description:String!
          street:String!
          city:String!
          postal_code:String!
          price: Float!
          email: String!
          username: String!
        ):Listing

        createBooking(
          listing_id:String!
          booking_id:String!
          booking_date:String!
          booking_start:String!
          booking_end:String!
          username:String!):Booking


    },
 ` 