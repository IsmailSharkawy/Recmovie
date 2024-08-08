import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { isWeekend } from "../utils/helpers.js";
import { DAY_TYPES } from "../utils/constants.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.userID);
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
  const obj = req.body;
  const file = req.file;
  // if (obj.password) {
  //     obj.password = await hashPassword(obj.password);
  // }
  if (file) {
    obj.avatar = file.path;
  }
  if (obj.password) {
    delete obj.password;
  }
  const user = await User.findByIdAndUpdate(req.userID, obj);
  res.status(StatusCodes.OK).json({ message: "Update successful." });
};

export const getUserWatchLists = async (req, res) => {
  const user = await User.findById(req.userID);
  res.status(StatusCodes.OK).json({ watchLists: user.watchLists });
};
export const addToWatchList = async (req, res) => {
  const { movie, dayTime } = req.body;
  const user = await User.findById(req.userID);
  const dayType = isWeekend() ? DAY_TYPES.WEEKENDS : DAY_TYPES.WEEKDAYS;

  try {
    user.watchlists[dayType][dayTime].push(movie);
  } catch (error) {
    console.log(error);
  }
  await user.save();
  res.status(StatusCodes.OK).json({ message: "Movie added to watchlist." });
};

export const removeFromWatchList = async (req, res) => {
  const { id, dayTime } = req.body;
  const user = await User.findById(req.userID);
  const dayType = isWeekend() ? DAY_TYPES.WEEKENDS : DAY_TYPES.WEEKDAYS;
  user.watchlists[dayType][dayTime] = user.watchlists[dayType][dayTime].filter(
    (m) => m.id !== id
  );
  await user.save();
  res.status(StatusCodes.OK).json({ message: "Movie removed from watchlist." });
};
