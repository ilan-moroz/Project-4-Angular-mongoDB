import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../Models/Store";
import { User } from "../Models/User";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

// save a new customer in database and check if email or idNumber already exists
userRouter.post(
  "/addUser",
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser: User = req.body;
    const email: string = newUser.email;
    const idNumber: number = newUser.idNumber;

    try {
      const existingUser = await UserModel.findOne({
        $or: [{ email: email }, { idNumber: idNumber }],
      });
      if (existingUser) {
        return res.status(400).json({
          message: "User with provided email or ID number already exists",
        });
      }

      const newCustomer = new UserModel(newUser);
      newCustomer
        .save()
        .then((customer) => {
          const token = jwt.sign(
            { id: customer._id, email: customer.email },
            "your_secret_key",
            { expiresIn: "2h" }
          );
          res.status(201).json({ customer, token });
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
);

export default userRouter;
