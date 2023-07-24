
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExist = await User.findOne(email);
    if (userExist) return res.status(400).json({ error: "Users already exist"});

    User.
    const hashPassword = await bcrypt.hash(password, )

    const createdAuthor = await  new User(req.body);
    res.status(201).json({ author: createdAuthor });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne(email);
    if (!userExist) return res.status(400).json({ error: "Users doesn't exist"});

    const createdAuthor = await  new User(req.body);
    res.status(201).json({ author: createdAuthor });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find();
    return res.status(420).json(users);

  } catch (error) {
    res.status(500).json({ error });
  }
};
