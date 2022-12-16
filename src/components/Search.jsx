import { debounce } from "lodash";
import React, { useState } from "react";

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");
  // const resetInputField = debounce(search(searchValue), 2000)
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
    // resetInputField()
  };


  // const callSearchFunction = (e) => {
  //   e.preventDefault();
  //   resetInputField();
  // };
  return (
    <form className="search">
      <h4>Search</h4>
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
        placeholder="Type movie name...."
      />
      {/* <button onClick={callSearchFunction} type="submit">
        Search
      </button> */}
    </form>
  );
};

export default Search;
