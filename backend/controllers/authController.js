import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePasswords, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { generateToken } from "../utils/tokenUtils.js";
export const register = async (req, res, next) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "User created successfully!" });
};

export const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials.");
  }
  const isMatch = await comparePasswords(req.body.password, user.password);
  if (!isMatch) {
    throw new UnauthenticatedError("Invalid credentials.");
  }

  const token = generateToken({ userID: user._id, isAdmin: user.isAdmin });

  const oneDay = 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ message: "Login successful!" });
};

export const logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(StatusCodes.OK).json({ message: "Logout successful!" });
};
