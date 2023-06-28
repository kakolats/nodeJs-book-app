const express = require('express');
const Book = require('../models/book');
const router = new express.Router();

//Add a book
router.post('/books',async(req,res)=>{
    try {
        const book = new Book(req.body);
        book.generateSlug();
        const bookSaved = await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
})

//Get a book with its slug
router.get('/books/:slug',async(req,res) =>{
    const slug = req.params.slug;
    try {
        const book = await Book.findBookBySlug(slug);
        if(!book) return res.status(404).send('Book not found !');
        return res.status(201).send(book);
    } catch (error) {
        res.status(500).send();
    }
})

//Get all the books
router.get('/books', async(req,res) => {
    try {
        const books = await Book.find({});
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
})

//Update a book
router.patch('/books/:slug', async(req,res) =>{
    const updatedInfo = Object.keys(req.body);
    const slug = req.params.slug;
    try {
        const book = await Book.findBookBySlug(slug);
        if(!book) return res.status(404).send('Book not found !');
        updatedInfo.forEach(update => book[update] = req.body[update]);
        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
})

//Delete a book
router.delete('/books/:slug', async(req,res) =>{
    const slug = req.params.slug;
    try {
        const book = await Book.findBookBySlug(slug);
        //console.log(book);
        if(!book) return res.status(404).send('Book not found !');
        const remove = await book.deleteOne();
        console.log(remove);
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
})


module.exports = router;