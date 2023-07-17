import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Book from "../models/Books";

export const createBook = async (req: Request, res: Response, next: NextFunction
): Promise<void> => {

  const { title, author } = req.body;

  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title,
    author,
  });

  try {
    const savedBook = await book.save();
    res.status(201).json({ book: savedBook });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const readBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(bookId).populate("author").select("-__v");
    if (book) {
      res.status(200).json({ book });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const readAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const books = await Book.find().populate("author").select("-__v");
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(bookId);
    if (book) {
      book.set(req.body);
      const updatedBook = await book.save();
      res.status(201).json({ book: updatedBook });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const bookId = req.params.bookId;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (deletedBook) {
      res.status(201).json({ message: "Deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
