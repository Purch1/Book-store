import express from "express";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";
import { createBook, readBook, readAllBooks, updateBook, deleteBook } from './../controllers/BookController';

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.book.create), createBook);
router.get('/get/:bookId', readBook);
router.get('/get/', readAllBooks);
router.patch('/update/:bookId', ValidateSchema(Schemas.book.update), updateBook);
router.delete('/delete/:bookId', deleteBook);

export = router; 