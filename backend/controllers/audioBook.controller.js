import { validationResult } from "express-validator";
import audioBookModel from "../models/audioBook.model.js";
import { generateResponse } from "../middlewares/response.helper.js";
import slugify from "slugify";
import reviewModel from "../models/review.model.js";

export const createAudioBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const allError = errors.errors.map((e) => e.msg);
    return generateResponse(res, 400, allError, null, false);
  }

  try {
    const { title, author, description, genre, coverImage } = req.body;

    const slug = slugify(title);
    const audioBookDetials = await audioBookModel.find({ slug });

    // console.log(audioBookDetials);

    if (audioBookDetials.length) {
      return generateResponse(res, 400, "Title Already Present", null, false);
    }

    const newAudioBook = await audioBookModel.create({
      title,
      slug,
      author,
      description,
      genre,
      coverImage,
    });

    return generateResponse(
      res,
      201,
      "Audio Book Added Successfully",
      null,
      true
    );
  } catch (err) {
    console.log(err);
    return generateResponse(
      res,
      500,
      "Error while creating audio book",
      null,
      false
    );
  }
};

export const getAudioBookBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const data = {};

    const details = await audioBookModel
      .findOne({ slug })
      .select("-createdAt -updatedAt -__v");

    if (!details) {
      return generateResponse(res, 400, "No Audio Book Found", null, false);
    }

    const review = await reviewModel
      .find({ audioBookId: details._id })
      .select("-__v")
      .sort({ rating: -1 })
      .limit(3);

    data.details = details;
    data.reviews = review;

    return generateResponse(
      res,
      200,
      "Audio Book Fetched Successfully",
      data,
      true
    );
  } catch (err) {
    console.log(err);
    return generateResponse(
      res,
      500,
      "Error while fetching audio book",
      null,
      false
    );
  }
};

//search by keyword, author, genre, rating
export const getAllAudioBook = async (req, res) => {
  try {
    let { pageId = 1 } = req.params;

    if (pageId < 1) pageId = 1;

    const {
      search = "",
      author = "",
      genre = "",
      rating = "0-5",
      order = "desc",
    } = req.query;

    console.log(req.query);

    const itemPerPage = 8;

    let args = {};

    if(author){
      args['author'] = author;
    }
    if(genre){
      args['genre'] = genre;
    }

    let details = await audioBookModel
      .find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
          { genre: { $regex: search, $options: "i" } },
          // { author: { $regex: author, $options: "i" } },
          // { genre: { $regex: genre, $options: "i" } },
        ],
        ...args,
        averageRating: { $gte: rating.charAt(0), $lte: rating.charAt(2) },
      })
      .sort({ rating: order === "asc" ? 1 : -1 })
      .select("-createdAt -updatedAt -__v")
      .skip((pageId - 1) * itemPerPage)
      .limit(itemPerPage);

    if (!details) {
      return generateResponse(res, 400, "No Audio Book Found", null, false);
    }

    return generateResponse(
      res,
      200,
      "Audio Book Fetched Successfully",
      details,
      true
    );
  } catch (err) {
    console.log(err);
    return generateResponse(
      res,
      500,
      "Error while fetching audio book details",
      null,
      false
    );
  }
};

export const getAuthor = async (req, res) => {
  try {
    const details = await audioBookModel.distinct("author");

    return generateResponse(
      res,
      200,
      "Author details Successfully",
      details,
      true
    );
  } catch (err) {
    console.log(err);
    return generateResponse(
      res,
      500,
      "Error while fetching author",
      null,
      false
    );
  }
};

export const getGenre = async (req, res) => {
    try {
      const details = await audioBookModel.distinct("genre");
  
      return generateResponse(
        res,
        200,
        "Genre details Successfully",
        details,
        true
      );
    } catch (err) {
      console.log(err);
      return generateResponse(
        res,
        500,
        "Error while fetching genre",
        null,
        false
      );
    }
  };
