import express, { Request, Response, NextFunction } from "express";
import { User, UserModel } from "../Models/Store";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { checkEmailId, login, register } from "../controllers/userController";
dotenv.config();

const userRouter = express.Router();

// register new user in database
userRouter.post("/register", register);

// handle login
userRouter.post("/login", login);

// check email and id
userRouter.get("/checkEmailId/:email/:idNumber", checkEmailId);

export default userRouter;
