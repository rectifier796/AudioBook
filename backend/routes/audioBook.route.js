import express from "express";
import { createAudioBook, getAllAudioBook, getAudioBookBySlug, getAuthor, getGenre } from "../controllers/audioBook.controller.js";
import { createAudioBookValidation } from "../middlewares/validator.middleware.js";


const audioBookRoutes = express.Router();

audioBookRoutes.post("/create", createAudioBookValidation, createAudioBook);

audioBookRoutes.get("/get-details/page/:pageId?", getAllAudioBook);

audioBookRoutes.get("/get-details/slug/:slug", getAudioBookBySlug);

audioBookRoutes.get("/get-author", getAuthor);

audioBookRoutes.get("/get-genre", getGenre);

export default audioBookRoutes;