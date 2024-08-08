import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

import cookieParser from "cookie-parser";

import authRouter from "./routes/authRouter.js";
import watchListRouter from "./routes/watchListRouter.js";
import userRouter from "./routes/userRoutes.js";
import moviesRouter from "./routes/moviesRouter.js";

import { authenticateUser } from "./middleware/authMiddleware.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

import path from "path";

const app = express();
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/v1/watchlist", authenticateUser, watchListRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/movies", authenticateUser, moviesRouter);

app.get("/api/v1/test", (req, res) => {
  res.json({ message: `Test` });
});
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is running on PORT ${port}...`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
