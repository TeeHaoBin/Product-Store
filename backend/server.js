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

const app = express(); // create an express application

app.get('/products', (req, res) => {       // "/" only is root route, e.g. /home is http://localhost:3000/home
    res.send("Server is opening products page");
})

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});