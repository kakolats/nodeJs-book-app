require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const { connectDb }  = require('./src/services/mongoose');
const Book = require('./src/models/book');

const bookRoutes = require('./src/routes/book');

const express = require('express');
const port = process.env.PORT | 3000;
const app = express();

connectDb().catch (err => console.log(err));

app.use(express.json());
app.use(bookRoutes);

app.listen(port,() => {
    console.log(`Server running on port 3000 : http://localhost:${port}`);
})