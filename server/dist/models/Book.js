"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    author: { type: String, required: true },
    name: { type: String, required: true },
    pages: { type: Number, required: true }
});
const Book = (0, mongoose_1.model)("book", BookSchema);
exports.Book = Book;
