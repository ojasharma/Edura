import { Request, Response } from "express";
import User from "../models/user";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { name, email, number } = req.body;

    if (!name || !email || !number) {
      return res
        .status(400)
        .json({ message: "Please provide name, email, and number." });
    }

    const newUser = new User({ name, email, number });
    await newUser.save();

    return res.status(201).json({ message: "User saved successfully!" });
  } catch (error: any) {
    console.error("Error saving user:", error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists." });
    }
    return res.status(500).json({ message: "Failed to save user." });
  }
};
