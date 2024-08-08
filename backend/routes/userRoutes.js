import {
  addToWatchList,
  getCurrentUser,
  getUserWatchLists,
  removeFromWatchList,
  updateUser,
} from "../controllers/userController.js";
import { Router } from "express";
import { validateUpdateInput } from "../middleware/validationMiddleware.js";
const userRouter = Router();

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});
export const upload = multer({ storage });
userRouter.get("/current-user", getCurrentUser);
userRouter.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateInput,
  updateUser
);
userRouter.get("/watchlists", getUserWatchLists);
userRouter.patch("/watchlists", addToWatchList);
userRouter.patch("/watchlists/remove", removeFromWatchList);

export default userRouter;
