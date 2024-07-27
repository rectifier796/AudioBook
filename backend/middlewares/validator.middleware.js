import { check } from "express-validator";


export const createAudioBookValidation = [
    check('title').notEmpty().withMessage("Title is required").escape(),
    check('author').notEmpty().withMessage("Author is required").escape(),
    check('description').notEmpty().withMessage("Description is required").escape(),
    check('genre').notEmpty().withMessage("Genre is required").escape(),
    check('coverImage').notEmpty().withMessage("Cover Image is required").escape()
]

export const createReviewValidation = [
    check('audioBookId').notEmpty().withMessage("Invalid Audio Book Id").escape(),
    check('rating').isNumeric().withMessage("Rating should be number").escape(),
    check('description').notEmpty().withMessage("Description is required").escape(),
    check('title').notEmpty().withMessage("Title is required").escape()
]