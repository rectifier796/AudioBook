import React from "react";

const SearchHeader = ({ state, dispatch }) => {
  const { searchTerm } = state;

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold mb-4">Audio Books</h2>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
          }
          placeholder="Search for books..."
          className="p-2 border rounded w-full"
        />
      </div>
    </div>
  );
};

export default SearchHeader;
