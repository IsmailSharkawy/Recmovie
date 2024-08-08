import { Router } from "express";

const watchListRouter = Router();

watchListRouter.get("/", (req, res) => {
  res.send(`Auth Router ${req.userID}`);
});

export default watchListRouter;
