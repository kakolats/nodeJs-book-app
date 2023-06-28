const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

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
    },
    slug: {
        type:String,
        unique: true
    }
})

bookSchema.methods.generateSlug = async function(){
    this.slug = this.title.toLowercase().replace(/\s+/g, '-')+uuidv4();
}

bookSchema.statics.findBookBySlug = async(slug) => {
    const book = await Book.findOne({slug});
    return book;
}

const Book = mongoose.model("Book",bookSchema);

module.exports = Book;