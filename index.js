require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const { connectDb }  = require('./src/services/mongoose');
const Book = require('./src/models/book');

const bookRoutes = require('./src/routes/book');
const commentRoutes = require('./src/routes/comment');

const express = require('express');
const port = process.env.PORT | 3000;
const app = express();

connectDb().catch (err => console.log(err));

app.use(express.json());
app.use(bookRoutes);
app.use(commentRoutes);

app.listen(port,() => {
    console.log(`Server running on port 3000 : http://localhost:${port}`);
})