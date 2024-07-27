import mongoose from "mongoose";


const audioBookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    averageRating:{
        type:Number,
        default:0
    },
    numOfReviews : {
        type:Number,
        default:0
    },
    coverImage: {
        type: String,
        required: true
    }
},{timestamps:true});

export default mongoose.model("AudioBook",audioBookSchema);