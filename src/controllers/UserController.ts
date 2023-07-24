import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ error: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10); 

    const createdUser = await User.create({ firstName, lastName, email, password: hashPassword });
    res.status(201).json({ user: createdUser });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User doesn't exist" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: "Invalid password" });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};
