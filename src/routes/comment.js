const express = require('express');
const Comment = require('../models/comment');
const Book = require('../models/book');
const router = new express.Router();

//Post a comment
router.post('/comments',async(req,res)=>{
    try {
        const comment = new Comment(req.body);
        comment.createdAt = new Date();
        console.log(comment);
        const commentSaved = await comment.save();
        console.log(commentSaved);
        const book = await Book.findByIdAndUpdate(
            req.body.bookId,
            {
              $push: {comments:commentSaved._id}  
            },
            { new: true, useFindAndModify: false }
        );
        console.log(book);
        res.status(201).send([commentSaved,book]);
    } catch (error) {
        res.status(500).send(error);
    }
})

//Delete a comment


module.exports = router;