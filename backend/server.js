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
import path from 'path';

import { connectDB } from './config/db.js'; 
import productRoutes from "./routes/product.route.js";

dotenv.config(); // load environment variables from .env file

const app = express(); // create an express application
const PORT = process.env.PORT || 3000; // set the port number

const __dirname = path.resolve(); // get the current directory

/*
    Test if the website can be opened on localhost
*/
// app.get('/home', (req, res) => {       // "/" only is root route, e.g. /home is http://localhost:3000/home
//     res.send("Server is opening products page");
// })

/*
    Middleware to parse JSON data in the body of the request
*/
app.use(express.json()); 

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}

/*
    Connection testing for MongoDB
*/
// console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    connectDB();           // connect to MongoDB
    console.log('Server started at http://localhost:' + PORT);
});