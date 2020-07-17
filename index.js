require('dotenv').config()
const express = require('express');
const app = require('./server.js');


const port = 5000;

app.listen(port, () => {
    console.log(`\n* Server Running on http://localhost:${port} *\n`);
}); 