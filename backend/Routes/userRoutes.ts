import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../Models/Store";
import { User } from "../Models/User";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

// Create a new customer
userRouter.post(
  "/addUser",
  (req: Request, res: Response, next: NextFunction) => {
    const newUser: User = req.body;
    const newCustomer = new UserModel(newUser);
    newCustomer
      .save()
      .then((customer) => {
        const token = jwt.sign(
          { id: customer._id, email: customer.email },
          "your_secret_key",
          { expiresIn: "1h" }
        );
        res.status(201).json({ customer, token });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }
);

export default userRouter;
