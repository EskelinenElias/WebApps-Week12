import { Router, Request, Response } from 'express';
import { Book } from '../models/Book';

const router = Router();

const validateBook = (req: Request) => {
  const { name, author, pages } = req.body;

}

router.post('/book', async (req: Request, res: Response) => {
  try {
    
    // Parse request
    const { name, author, pages } = req.body;
    
    // Validate input presence
    if (!name || !author || !pages) {
      res.status(400).json({ error: "Invalid request." });
      return;
    }
  
    // Validate input types
    if (typeof name !== 'string' || typeof author !== 'string' || typeof pages !== 'number') {
      res.status(400).json({ error: "Invalid request." });
      return;
    }
    
    // Check if book is already in the database
    if (await Book.findOne({ name: name, author: author })) {
      res.status(400).json({ error: "Book already exists." });
      return;
    }
    
    // Add book to the database
    const newBook = await Book.create({ name, author, pages });
    res.status(200).json({ message: `Book added successfully.`, book: newBook });
    
  } catch (error: any) {
    
    // Log error and send failure response
    console.error("Unknown error: ", error.message);
    res.status(500).json({ error: "Unknown server error." });
  }
});

export default router;
