const mongoose = require('mongoose');
const validator = require('validator');
const { uuid } = require('uuidv4');

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
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

bookSchema.methods.generateSlug = async function(){
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-')+uuid();
}

bookSchema.statics.findBookBySlug = async(slug) => {
    const book = await Book.findOne({slug}).populate("comments");
    return book;
}

const Book = mongoose.model("Book",bookSchema);

module.exports = Book;