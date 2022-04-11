const User = require('./models/user');
const Listing = require('./models/listing');
const Booking = require('./models/booking');
const {validateLogin} = require('./Validators/validation');
const { UserInputError } = require('apollo-server-express');
const authentication = require('./Validators/authentication');

const jsonwebtoken =require('jsonwebtoken');



require('dotenv').config();
generateToken = (user) =>{
    return jsonwebtoken.sign({
        id: user.id,
        email:user.email,
        username:user.username,
        type:user.type
    },process.env.KEY,{expiresIn: '2h'});
}



exports.resolvers = {
    Query: {
        viewListings: async (parent, args) => {
            return await Listing.find({});
        },
        searchListingByName: async(_,{listing_title})=>{
            try{
                const searchByName = await Listing.find({listing_title});
                if(searchByName){
                    return searchByName;
                }else{
                    throw new Error('Listing not found');
                }
            }catch(err){
                throw new Error(err);
            }
        },        
        searchListingByCity : async(_,{city})=>{
            try{
                const searchByCity = await Listing.find({city});
                if(searchByCity){
                    return searchByCity;
                }else{
                    throw new Error('Listing not found');
                }
            }catch(err){
                throw new Error(err);
            }
        },
        searchListingByPostalcode : async(_,{postal_code})=>{
            try{
                const searchByCityPostalcode = await Listing.find({postal_code});
                if(searchByCityPostalcode){
                    return searchByCityPostalcode;
                }else{
                    throw new Error('Listing not found');
                }
            }catch(err){
                throw new Error(err);
            }
        },
        viewUserBookings : async(_,{username},context) => {
            const user = authentication(context);
            const viewBookings = await Booking.find({username})
            if(user.type=='customer'){
                if(viewBookings){
                    return viewBookings;
                }else{
                    throw new Error('Booking not found');
                }  
            }
            else{
                throw new Error("This account does not have permission to view user bookings");
            }
            
        },
        viewListingsAddedByAdmin : async(_,{username},context)=> {
            const user = authentication(context);
            const viewListings = await Listing.find({username})
            if(user.type=='admin'){
                if(viewListings){
                    return viewListings;
                }else{
                    throw new Error('Listing not found');
                }  
            }
            else{
                throw new Error("This account does not have permission to view user bookings");
            }
            
        },

        login : async(_,{username,password}) =>{
            const {errors,valid} = validateLogin(username,password);
            const user = await User.findOne({username});
            if(!valid){
                throw new UserInputError('Errors',{errors});
            } 
            if(!user){
                errors.general ="User not found";
                throw new UserInputError('User not found',{errors});
            }
            if(password != user.password){
                errors.general ="Incorrect Password";
                throw new UserInputError('Incorrect Password',{errors});
            }
            const token = generateToken(user);
            return{
                ...user._doc,
                id:user._id,
                token
            };
        },

    },

    Mutation: {

      register: async (parent, args) => {
        console.log(args)
        const emailValidation = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const ValidEmail =  emailValidation.test(String(args.email).toLowerCase())
        
        if(!ValidEmail){
            throw new Error("Email is not in the Correct format")
        }

            let addUser = new User({
                username: args.username,
                firstname:args.firstname,
                lastname:args.lastname,
                password:args.password,
                email: args.email,
                type:args.type

            });
        const res = await addUser.save();

        const token = generateToken(res);

        return{
            ...res._doc,
            id:res._id,
            token
        };
        },
        createListing: async (parent, args,context) => {
                const user = authentication(context);
                if(user.type=='admin'){
                    let addListing = new Listing({
                    listing_id : args.listing_id,
                    listing_title: args.listing_title,
                    description:args.description,
                    street: args.street,
                    city:args.city,
                    postal_code:args.postal_code,
                    price: args.price,
                    email: args.email,
                    username: args.username
    
                });
                return  await addListing.save();
                }

                else{
                    throw new Error("This account does not have permission to create a listing");
                }

            },
            createBooking: async (parent, args,context) => {
                const user = authentication(context);
                if(user.type=='customer'){
                    let addBooking = new Booking({
                    listing_id : args.listing_id,
                    booking_id: args.booking_id,
                    booking_date:args.booking_date,
                    booking_start: args.booking_start,
                    booking_end:args.booking_end,
                    username:args.username,
    
                });
                return  await addBooking.save();
                }
                else{
                    throw new Error("This account does not have permission to create booking");
                }
            },
    }
  }