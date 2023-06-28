const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    pages_number : {
        type: Number,
    },
    author : {
        type: String,
        required: true
    }
})

const Book = mongoose.model("Book",bookSchema);

module.exports = Book;