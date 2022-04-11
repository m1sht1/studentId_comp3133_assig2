const TypeDefs = require('./schema');
const Resolvers = require('./resolvers');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { buildSchema} = require('graphql')
const { graphqlHTTP} = require('express-graphql')
require('dotenv').config();
const jwt =require('jsonwebtoken');

const port = process.env.PORT || 4000;



const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers,
    context: ({req}) =>({req})
});



const app = express();
app.use(express.json());
app.use('*', cors());


server.start().then(res => {
    server.applyMiddleware({ app, path: '/' });
    app.listen({ port }, () => 
    console.log(`Server is running on port: ${port}`)
    );  
  });








