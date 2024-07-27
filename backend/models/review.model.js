import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    audioBookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AudioBook",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required:true,
      default:""
    },
  },
  { timestamps: true }
);

reviewSchema.statics.calculateAverageRating = async function (audioBookId) {

  const result = await this.aggregate([
    { $match: { audioBookId: audioBookId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);
//   console.log(result);

  try {
    await this.model("AudioBook").findOneAndUpdate(
      { _id: audioBookId },
      {
        averageRating: Math.round(result[0]?.averageRating*10)/10 || 0,
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

reviewSchema.post("save", async function (doc) {
  await this.constructor.calculateAverageRating(doc.audioBookId);
});

reviewSchema.post("remove", async function (doc) {
  await this.constructor.calculateAverageRating(doc.audioBookId);
});

const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel;
