import { Document, Schema, model } from "mongoose";

interface IBook extends Document {
  author: string;
  name: string;
  pages: number; 
}

const BookSchema = new Schema<IBook>({
  author: { type: String, required: true },
  name: { type: String, required: true },
  pages: { type: Number, required: true }
});

const Book = model<IBook>("book", BookSchema);

export { Book, IBook };