import { Request, Response } from "express";
import { User, UserModel } from "../Models/Store";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { checkExistingUser } from "../services/checkUserService";
dotenv.config();

export const register = async (req: Request, res: Response) => {
  const newUser: User = req.body;
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  const newCustomer = new UserModel(newUser);
  newCustomer
    .save()
    .then((customer) => {
      const token = jwt.sign(
        { id: customer._id, email: customer.email },
        process.env.SECRET_KEY!,
        { expiresIn: "2h" }
      );
      res.status(201).json({
        customer,
        token,
        user: {
          firstName: customer.firstName,
          lastName: customer.lastName,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Retrieve user from the database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Check if the provided password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate a new JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY!,
      { expiresIn: "2h" }
    );
    res.status(200).json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// check if email or idNumber already exists in database
export const checkEmailId = async (req: Request, res: Response) => {
  const email = req.params.email;
  const idNumber = +req.params.idNumber;
  try {
    const existingUser = await checkExistingUser(email, idNumber);
    if (existingUser) {
      return res.status(200).json({
        exists: true,
      });
    } else {
      return res.status(200).json({
        exists: false,
      });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
