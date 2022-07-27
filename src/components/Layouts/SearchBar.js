import React from "react";

const SearchBar = ({ keyword, setKeyword, sort }) => {
  const filter = (e) => {
    let userInput = e.target.value;
    setKeyword(userInput);
  };

  return (
    <div
      className="ui search"
      style={{ display: "flex", justifyContent: "center", gap: "10px" }}
    >
      <input
        className="prompt"
        type="search"
        value={keyword}
        onChange={filter}
        placeholder="Wyszukaj..."
      />
      <div className="results"></div>
      <button className="ui icon button" onClick={sort}>
        <i className="sort amount down icon"></i>
      </button>
    </div>
  );
};

export default SearchBar;
