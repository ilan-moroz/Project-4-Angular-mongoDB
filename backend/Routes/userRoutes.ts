import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../Models/Store";

const userRouter = express.Router();

// Create a new customer
userRouter.post(
  "/addUser",
  (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      lastName,
      username,
      identityCard,
      password,
      city,
      street,
      role,
    } = req.body;
    const newCustomer = new UserModel({
      name,
      lastName,
      username,
      identityCard,
      password,
      city,
      street,
      role,
    });
    newCustomer
      .save()
      .then((customer) => {
        res.status(201).json(customer);
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to create customer" });
      });
  }
);

export default userRouter;
