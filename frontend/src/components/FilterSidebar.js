import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const FilterSidebar = ({ state, dispatch }) => {
  const {
    selectedGenre,
    selectedAuthor,
    ratingRange
  } = state;

  const [isGenreOpen, setGenreOpen] = useState(false);
  const [isAuthorOpen, setAuthorOpen] = useState(false);
  const [isRatingOpen, setRatingOpen] = useState(false);

  const [genre, setGenre] = useState([]);
  const [author, setAuthor] = useState([]);

  const handleGenreToggel = ()=>{
    setGenreOpen((prev)=>!prev);
  }

  const handleAuthorToggel = ()=>{
    setAuthorOpen((prev)=>!prev);
  }

  const handleRatingToggel = ()=>{
    setRatingOpen((prev)=>!prev);
  }

  const fetchGenre = async () => {
    const url = `${process.env.REACT_APP_URL}/api/audio-book/get-genre`;
    const data = (await axios.get(url)).data;
    setGenre(data.data);
  };

  const fetchAuthor = async () => {
    const url = `${process.env.REACT_APP_URL}/api/audio-book/get-author`;
    const data = (await axios.get(url)).data;
    setAuthor(data.data);
  };

  useEffect(() => {
    fetchGenre();
    fetchAuthor();
  }, []);

  return (
    <aside className="md:w-64 bg-gray-100 p-4 md:min-h-screen md:max-h-screen md:overflow-y-auto overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4">Filters</h3>

      {/* Genre Filter */}
      <div className="mb-4">
        <button
          onClick={() => handleGenreToggel()}
          className="w-full text-left font-medium mb-2 flex items-center"
        >
          <FontAwesomeIcon
            icon={isGenreOpen ? faChevronUp : faChevronDown}
            className="mr-2"
          />
          Genre
        </button>
        {isGenreOpen && (
          <div>
            <label>
              <input
                type="radio"
                value=""
                checked={selectedGenre === ""}
                onChange={(e) =>
                  dispatch({ type: "SET_GENRE", payload: e.target.value })
                }
              />
              All
            </label>
            <br />
            {genre &&
              genre.map((g,ind) => {
                return (
                  <>
                    <label>
                      <input
                        type="radio"
                        value={g}
                        checked={selectedGenre === g}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_GENRE",
                            payload: e.target.value,
                          })
                        }
                      />
                      {g}
                    </label>
                    <br />
                  </>
                );
              })}
          </div>
        )}
      </div>

      {/* Author Filter */}
      <div className="mb-4">
        <button
          onClick={() => handleAuthorToggel()}
          className="w-full text-left font-medium mb-2 flex items-center"
        >
          <FontAwesomeIcon
            icon={isAuthorOpen ? faChevronUp : faChevronDown}
            className="mr-2"
          />
          Author
        </button>
        {isAuthorOpen && (
          <div>
            <label>
              <input
                type="radio"
                value=""
                checked={selectedAuthor === ""}
                onChange={(e) =>
                  dispatch({ type: "SET_AUTHOR", payload: e.target.value })
                }
              />
              All
            </label>
            <br />
            {author &&
              author.map((aut,ind) => {
                return (
                  <>
                    <label>
                      <input
                        type="radio"
                        value={aut}
                        checked={selectedAuthor === aut}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_AUTHOR",
                            payload: e.target.value,
                          })
                        }
                      />
                      {aut}
                    </label>
                    <br />
                  </>
                );
              })}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <button
          onClick={() => handleRatingToggel()}
          className="w-full text-left font-medium mb-2 flex items-center"
        >
          <FontAwesomeIcon
            icon={isRatingOpen ? faChevronUp : faChevronDown}
            className="mr-2"
          />
          Rating
        </button>
        {isRatingOpen && (
          <div>
            <label>
              <input
                type="radio"
                value="0-5"
                checked={ratingRange === "0-5"}
                onChange={(e) =>
                  dispatch({
                    type: "SET_RATING_RANGE",
                    payload: e.target.value,
                  })
                }
              />
              All
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="1-2"
                checked={ratingRange === "1-2"}
                onChange={(e) =>
                  dispatch({
                    type: "SET_RATING_RANGE",
                    payload: e.target.value,
                  })
                }
              />
              1-2 Stars
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="2-3"
                checked={ratingRange === "2-3"}
                onChange={(e) =>
                  dispatch({
                    type: "SET_RATING_RANGE",
                    payload: e.target.value,
                  })
                }
              />
              2-3 Stars
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="3-4"
                checked={ratingRange === "3-4"}
                onChange={(e) =>
                  dispatch({
                    type: "SET_RATING_RANGE",
                    payload: e.target.value,
                  })
                }
              />
              3-4 Stars
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="4-5"
                checked={ratingRange === "4-5"}
                onChange={(e) =>
                  dispatch({
                    type: "SET_RATING_RANGE",
                    payload: e.target.value,
                  })
                }
              />
              4-5 Stars
            </label>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;
