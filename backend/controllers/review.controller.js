import { validationResult } from "express-validator";
import { generateResponse } from "../middlewares/response.helper.js";
import audioBookModel from "../models/audioBook.model.js";
import mongoose from "mongoose";
import reviewModel from "../models/review.model.js";

export const createReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const allError = errors.errors.map((e) => e.msg);
      return generateResponse(res, 400, allError, null, false);
    }

    const {title, description, rating, audioBookId} = req.body;

    if(rating<1 || rating>5){
        return generateResponse(res,400,"Invalid Rating",null,false);
    }

    if (!mongoose.isValidObjectId(audioBookId)) {
        return generateResponse(res, 400, "Invalid Audio Book Id", null, false);
      }

    const audioBookDetials = await audioBookModel.findById(audioBookId);

    if(!audioBookDetials){
        return generateResponse(res,400,"Invalid Audio Book Id",null,false);
    }

    await reviewModel.create({title,description,rating,audioBookId});

    return generateResponse(
        res,
        201,
        "Review Added Successfully",
        null,
        true
      );

  } catch (err) {
    console.log(err);
    return generateResponse(
      res,
      500,
      "Error while creating review",
      null,
      false
    );
  }
};

export const getReviewById = async (req, res) => {
    try {
      let { audioBookId, pageId = 1 } = req.params;

      if(pageId<1)
        pageId = 1;

      const {order = "desc", interval = "1-5"} = req.query;

      const itemPerPage = 3;
  
      const details = await audioBookModel.findById(audioBookId);
  
      if (!details) {
        return generateResponse(res, 400, "No Audio Book Found", null, false);
      }
  
      const review = await reviewModel
        .find({ audioBookId, rating : {$gte : interval.charAt(0), $lte : interval.charAt(2)} })
        .select("-__v")
        .sort({"rating" : order=="asc" ? 1 : -1})
        .skip((pageId-1)*itemPerPage)
        .limit(itemPerPage);
  
      return generateResponse(
        res,
        200,
        "Review Fetched Successfully",
        review,
        true
      );
    } catch (err) {
      console.log(err);
      return generateResponse(
        res,
        500,
        "Error while Fetching review",
        null,
        false
      );
    }
  };