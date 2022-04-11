const jwt =require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
require('dotenv').config();
module.exports = (context) =>{
    
    const Header = context.req.headers.authorization;


    if(Header){
        const token = Header.split('Bearer ')[1];


        if(token){
            try{
                const user = jwt.verify(token,process.env.KEY)
                return user;


            }catch(err){
                    throw new AuthenticationError('Invalid or Expired token');


            }
        }


        throw new AuthenticationError('Authentication token must be \'Bearer [token]');
    }


    throw new AuthenticationError('Authorization header must be provided');
};