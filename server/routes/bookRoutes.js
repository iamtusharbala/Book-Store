const express = require('express')
const router = express.Router()
const Book = require('../model/book')


// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        if (books.length <= 0) {
            return res.status(500).json({ message: 'No books found' })
        }
        res.status(200).json({ books })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching books' })
    }
})

// Adding Books
router.post('/', async (req, res) => {
    try {
        const { title, price, author, genre, description, coverImage } = req.body
        const newBook = new Book({
            title,
            author,
            price,
            genre,
            description,
            coverImage
        })

        await newBook.save()
        res.status(201).json({ message: 'New Book created successfully', book: newBook })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating book' })
    }

})

module.exports = router