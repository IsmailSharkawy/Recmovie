import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    overview: { type: String, required: true },
    release_date: { type: String, required: true },
    vote_average: { type: Number, required: true },
    poster_path: { type: String, required: true },
    id: { type: Number, required: true },
  },
  { _id: false }
);
const watchlistSchema = new Schema(
  {
    morning: [movieSchema],
    afternoon: [movieSchema],
    night: [movieSchema],
  },

  { _id: false }
);

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hasOccupation: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    watchlists: {
      weekdays: { type: watchlistSchema, default: () => ({}) },
      weekends: { type: watchlistSchema, default: () => ({}) },
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
