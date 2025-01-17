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
import Product from '../models/product.model.js';

dotenv.config(); // load environment variables from .env file

const app = express(); // create an express application

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

app.get("/api/products", async (req, res) => {
   try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
   } catch (error) {
    console.log("Error in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error."});
   }
})

app.post("/api/products", async (req, res) => {
    const product = req.body;   // user'll send this data 

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating product: ", error.message);
        res.status(500).json({ success: false, message: "Server error."})
    }
});

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    /*
        Testing for DELETE API in terminal using postman
    */
    // console.log("id: ", id);

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product is deleted." });
    } catch (error) {
        console.log("Error in deleting product:", error.message);
        res.status(404).json({ success: false, message: "Product not found." });
    }
});

/*
    Connection testing for MongoDB
*/
// console.log(process.env.MONGO_URI);

app.listen(3000, () => {
    connectDB();           // connect to MongoDB
    console.log('Server started at http://localhost:3000');
});