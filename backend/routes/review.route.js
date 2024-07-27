import express from "express";
import { createReview, getReviewById } from "../controllers/review.controller.js";
import { createReviewValidation } from "../middlewares/validator.middleware.js";


const reviewRoutes = express.Router();

reviewRoutes.post("/create", createReviewValidation, createReview);

reviewRoutes.get("/get-review/:audioBookId/:pageId?", getReviewById);

export default reviewRoutes;