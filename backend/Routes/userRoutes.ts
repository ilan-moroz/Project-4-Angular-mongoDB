import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../Models/Store";
import { User } from "../Models/User";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

// save new customer in database
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
          { expiresIn: "2h" }
        );
        res.status(201).json({ customer, token });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }
);

// check if email or idNumber already exists in database
const checkExistingUser = async (email: string, idNumber: number) => {
  const existingUser = await UserModel.findOne({
    $or: [{ email: email }, { idNumber: idNumber }],
  });

  return existingUser;
};

userRouter.get(
  "/checkEmailId/:email/:idNumber",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

export default userRouter;
