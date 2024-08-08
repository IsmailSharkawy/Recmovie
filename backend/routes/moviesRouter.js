import { Router } from "express";
import { getMovieRecommendations } from "../controllers/moviesController.js";

const moviesRouter = Router();

moviesRouter.get("/", getMovieRecommendations);

export default moviesRouter;
