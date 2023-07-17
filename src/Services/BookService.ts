// services/bookService.ts

import Book, { BookDocument } from "../models/Books";
import mongoose from "mongoose";

export const createBook = async (title: string, author: string): Promise<BookDocument> => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title,
    author,
  });

  return book.save();
};

export const getBook = async (bookId: string): Promise<BookDocument | null> => {
  return Book.findById(bookId).populate("author").select("-__v");
};

export const getAllBooks = async (): Promise<BookDocument[]> => {
  return Book.find().populate("author").select("-__v");
};

export const updateBook = async (
  bookId: string,
  title: string,
  author: string
): Promise<BookDocument | null> => {
  const book = await Book.findById(bookId);
  if (book) {
    book.title = title;
    book.author = author;
    return book.save();
  }
  return null;
};

export const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  return Book.findByIdAndDelete(bookId);
};
