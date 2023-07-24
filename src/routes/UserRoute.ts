import express from "express";
import { createUser, login, getAllUsers } from './../controllers/UserController';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', login);
router.get('/get/', getAllUsers);

export = router; 