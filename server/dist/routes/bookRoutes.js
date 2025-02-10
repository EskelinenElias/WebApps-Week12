"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Book_1 = require("../models/Book");
const router = (0, express_1.Router)();
const validateBook = (req) => {
    const { name, author, pages } = req.body;
};
router.post('/book', async (req, res) => {
    try {
        // Parse request
        const { name, author, pages } = req.body;
        // Validate input types
        if (typeof name !== 'string' || typeof author !== 'string' || typeof pages !== 'number') {
            console.error("Invalid input types", typeof name, typeof author, typeof pages);
            res.status(400).json({ error: "Invalid request." });
            return;
        }
        // Validate input presence
        if (!name || !author || pages < 0) {
            console.error("Invalid input");
            res.status(400).json({ error: "Invalid request." });
            return;
        }
        // Check if book is already in the database
        if (await Book_1.Book.findOne({ name: name, author: author })) {
            console.log("Book already exists");
            res.status(400).json({ error: "Book already exists." });
            return;
        }
        // Add book to the database
        let newBook;
        if (process.env.DB_BEHAVIOUR === "don't save") {
            // Don't save the book for testing purposes
            newBook = new Book_1.Book({ name, author, pages });
            console.log("Book was not saved to DB, but code run successfully.");
        }
        else {
            // Save the new book normally
            newBook = await Book_1.Book.create({ name, author, pages });
            console.log("Book was saved to DB, and code run successfully.");
        }
        res.status(200).json({ message: `Book added successfully.`, book: newBook });
    }
    catch (error) {
        // Log error and send failure response
        console.error("Unknown error: ", error.message);
        res.status(500).json({ error: "Unknown server error." });
    }
});
// GET Route to get a book by name and/or author
router.get('/book', async (req, res) => {
    try {
        // Parse request
        const name = req.query.name || '';
        const author = req.query.author || '';
        // Validate input types
        if (typeof name !== 'string' || typeof author !== 'string') {
            console.error("Invalid input types", typeof name, typeof author);
            res.status(400).json({ error: "Invalid request." });
            return;
        }
        // Construct query
        let query;
        if (name && author) {
            query = { name: name, author: author };
        }
        else if (name) {
            query = { name: name };
        }
        else if (author) {
            query = { author: author };
        }
        else {
            console.error("Invalid input");
            res.status(400).json({ error: "Invalid request." });
            return;
        }
        // Find a book in the database with the name and/or author
        const book = await Book_1.Book.findOne(query);
        if (!book) {
            // Respond with not found message
            console.log("Book not found.");
            res.status(404).json({ message: "Book not found." });
            return;
        }
        // Return the book
        res.status(200).json({ message: "Book found.", book: book });
    }
    catch (error) {
        // Log error and send failure response
        console.error("Unknown error: ", error.message);
        res.status(500).json({ error: "Unknown server error." });
    }
});
exports.default = router;
