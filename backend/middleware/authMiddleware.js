import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication failed." });
  }
  try {
    const { userID } = verifyToken(token);
    req.userID = userID;
  } catch (error) {
    throw new UnauthenticatedError("Authentication failed.");
  }
  next();
};
