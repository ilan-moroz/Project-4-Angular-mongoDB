import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import userRouter from "./Routes/userRoutes";
import helmet from "helmet";
import mongoose from "mongoose";

// Create Server
const server = express();

// Handle CORS
server.use(cors());

//How we send the data back
server.use(express.json());

//Parse the body as JSON
server.use(bodyParser.json());

// How to use routes
server.use("/mongoStore/user", userRouter);

// for security
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Start the server
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    server.listen(process.env.PORT, () =>
      console.log(
        `Connected to MongoDB,Server running on port: ${process.env.PORT}`
      )
    );
  })
  .catch((error) => {
    console.log(`Cannot connect to database: ${error.message}`);
    process.exit(1);
  });
