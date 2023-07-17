import express from "express";
import { ValidateSchema, Schemas } from "../middleware/ValidateSchema";
import { createAuthor, readAuthor, readAllAuthor, updateAuthor, deleteAuthor } from "../controllers/AuthorController";

const router = express.Router();

router.post("/create", ValidateSchema(Schemas.author.create), createAuthor);
router.get("/authors/:authorId", readAuthor);
router.get("/authors", readAllAuthor);
router.put("/authors/:authorId", ValidateSchema(Schemas.author.update), updateAuthor);
router.delete("/authors/:authorId", deleteAuthor);

export default router;
