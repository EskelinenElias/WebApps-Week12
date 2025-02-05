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
        // const newBook = await Book.create({ name, author, pages });
        const newBook = new Book_1.Book({ name, author, pages }); // Don't save the book for testing purposes
        res.status(200).json({ message: `Book added successfully.`, book: newBook });
    }
    catch (error) {
        // Log error and send failure response
        console.error("Unknown error: ", error.message);
        res.status(500).json({ error: "Unknown server error." });
    }
});
exports.default = router;
