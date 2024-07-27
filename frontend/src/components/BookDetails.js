import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "./rating/StarRating";
import { Rating, Typography } from "@material-tailwind/react";
import axios from "axios";

const BookDetails = () => {
  const { slug } = useParams();

  const [audioBook, setAudioBook] = useState({});
  const [reviews, setReviews] = useState([]);

  const fetchAudioBookDetails = async () => {
    const url = `${process.env.REACT_APP_URL}/api/audio-book/get-details/slug/${slug}`;
    const data = (await axios.get(url)).data;
    setAudioBook(data.data.details);
    setReviews(data.data.reviews);
    console.log(data);
  };

  useEffect(() => {
    fetchAudioBookDetails();
  }, []);

  const [visibleReviews, setVisibleReviews] = useState(0);
  const [reviewPage, setReviewPage] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 1, title: "", description: "" });

  const fetchMoreReview = async (page) => {
    setVisibleReviews(reviews.length);
    const url = `${process.env.REACT_APP_URL}/api/review/get-review/${audioBook._id}/${page}`;
    const data = (await axios.get(url)).data;
    setReviews((prev) => [...prev, ...data.data]);
    console.log(data);
  };

  const loadMoreReviews = async () => {
    await fetchMoreReview(reviewPage + 1);
    setReviewPage((prev) => prev + 1);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async(e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_URL}/api/review/create`;
    const data = await axios.post(url,{...newReview, audioBookId : audioBook._id});

    console.log(data);

    // const updatedReviews = [...reviews, { user: "NewUser", ...newReview }];
    // setReviews(updatedReviews);
    // setNewReview({ rating: 1, comment: "" });
    // setShowReviewForm(false);
  };

  if (!audioBook) {
    return <div>Book not found</div>;
  }

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <div className="block md:grid md:grid-cols-2 md:gap-4">
          <div className="mb-4 md:mb-0 md:pr-4">
            <img
              src={audioBook.coverImage}
              alt={audioBook.title}
              className="w-full h-96 object-cover mb-4 md:mb-0 rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-4">{audioBook.title}</h1>
              <p className="mb-4">{audioBook.description}</p>
              <p className="mb-4 text-gray-600">
                <strong>Genre:</strong> {audioBook.genre}
              </p>
              <p className="mb-4 text-gray-600">
                <strong>Author:</strong> {audioBook.author}
              </p>
              <StarRating rating={audioBook.averageRating} />

              <p className="mb-4 text-gray-600">
                <spna>{audioBook.averageRating}</spna> (Based on {audioBook.numOfReviews} reviews)
              </p>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-8">
          <h2 className="text-2xl text-center font-semibold mb-4">
            User Reviews
          </h2>
          {reviews.map((review, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>{review.title}</strong>
              </p>
              <p>{review.description}</p>
              <StarRating rating={review.rating} />
            </div>
          ))}
          {visibleReviews !== reviews.length && (
            <button
              onClick={loadMoreReviews}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Load More Reviews
            </button>
          )}
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowReviewForm((prev) => !prev)}
              className="p-2 bg-green-500 text-white rounded"
            >
              {showReviewForm ? "Cancel" : "Write a Review"}
            </button>
          </div>
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mt-4">
              <div className="mb-4">
                <label htmlFor="rating" className="block mb-2 text-gray-600">
                  Rating:
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  value={newReview.rating}
                  onChange={handleReviewChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rating" className="block mb-2 text-gray-600">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newReview.title}
                  onChange={handleReviewChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block mb-2 text-gray-600">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newReview.description}
                  onChange={handleReviewChange}
                  className="w-full p-2 border rounded"
                  rows="4"
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
