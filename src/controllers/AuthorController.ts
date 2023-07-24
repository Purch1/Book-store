// controllers/authorController.ts

import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Author from "../models/Author";

export const createAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name } = req.body;
  // const author = new Author({ _id: new mongoose.Types.ObjectId(),
  //   name,
  // });

  try {
    const createdAuthor = await  new Author(req.body);
    res.status(201).json({ author: createdAuthor });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  try {
    const author = await Author.findById(authorId);
    if (author) {
      res.status(200).json({ author });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const readAllAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await Author.find();
    res.status(200).json({ authors });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  try {
    const author = await Author.findById(authorId);
    if (author) {
      author.set(req.body);
      const updatedAuthor = await author.save();
      res.status(201).json({ author: updatedAuthor });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  try {
    const deletedAuthor = await Author.findByIdAndDelete(authorId);
    if (deletedAuthor) {
      res.status(201).json({ message: "Deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
