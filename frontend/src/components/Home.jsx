import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";
import SearchHeader from "./SearchHeader";
import StarRating from "./rating/StarRating";
import axios from "axios";

const initialState = {
  selectedGenre: "",
  selectedAuthor: "",
  ratingRange: "0-5",
  searchTerm: "",
  page: 1,
};

const reducer = (state, action) => {

  switch (action.type) {
    case "SET_GENRE":
      return { ...state, selectedGenre: action.payload };
    case "SET_AUTHOR":
      return { ...state, selectedAuthor: action.payload };
    case "SET_RATING_RANGE":
      return { ...state, ratingRange: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "Change_PAGE":
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [audioBook, setAudioBook] = useState([]);
  const navigate = useNavigate();

  const fetchAudioBook = async () => {
    const url = `${process.env.REACT_APP_URL}/api/audio-book/get-details/page/${state.page}?author=${state.selectedAuthor}&genre=${state.selectedGenre}&rating=${state.ratingRange}&search=${state.searchTerm}`;

    const data = (await axios.get(url)).data;

    setAudioBook(data.data);
    console.log(data);

  };

  useEffect(() => {
    fetchAudioBook();
  }, [state]);

  const handleBookClick = (slug) => {
    navigate(`/book/${slug}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Filter Sidebar */}
      <FilterSidebar state={state} dispatch={dispatch} />

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Search Header */}
        <SearchHeader state={state} dispatch={dispatch} />

        {/* Grid for Books */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {audioBook.length > 0 ? (
            audioBook.map((book) => (
              <div
                key={book._id}
                className="w-full sm:w-auto px-4 mb-8 hover-effect"
                onClick={() => handleBookClick(book.slug)}
              >
                <div className="group rounded-md overflow-hidden shadow-md relative bg-gray-50 hover:shadow-lg transition duration-300 cursor-pointer">
                  <img
                    src={book.coverImage}
                    alt="book"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                    <p className="text-gray-600">By {book.author}</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "5px",
                      }}
                    >
                      <StarRating rating={book.averageRating} />
                    </div>
                    <span>{book.averageRating} (Based on {book.numOfReviews} reviews)</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center">No books found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
