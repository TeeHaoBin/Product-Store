/*
############################
##Entry point for the API###
############################
*/

/*
Traditional way to import express
*/
// const express = require( 'express');
import express from 'express';      // need to add "type": "module" in package.json
import dotenv from 'dotenv';        // dotenv allows access to .env file content which normally show 'undefined' in terminal 
import { connect } from 'mongoose';
import { connectDB } from './config/db.js'; 

dotenv.config(); // load environment variables from .env file

const app = express(); // create an express application

app.get('/products', (req, res) => {       // "/" only is root route, e.g. /home is http://localhost:3000/home
    // res.send("Server is opening products page");
})


/*
    Connection testing for MongoDB
*/
// console.log(process.env.MONGO_URI);

app.listen(3000, () => {
    connectDB();           // connect to MongoDB
    console.log('Server started at http://localhost:3000');
});