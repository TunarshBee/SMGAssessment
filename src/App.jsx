import React, { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import "./App.scss";
import { initialState, reducer } from "./store/reducer";
import { spinner } from "./assets/images";
import Movie from "./components/Movie";
import axios from "axios";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=multiverse&apikey=fd4ef27a";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then((jsonResponse) => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search,
      });
    });

    const scrollContainer = document.getElementById("scrl1");

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
    const scrollContainer2 = document.getElementById("scrl2");

    scrollContainer2.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer2.scrollLeft += evt.deltaY;
    });
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=fd4ef27a`).then(
      (jsonResponse) => {
        console.log(jsonResponse.data);
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.Search,
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error,
          });
        }
      }
    );
  };

  const { movies, errorMessage, loading } = state;
  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      

      movies.map((movie, index) => (
        <>
        
          <Movie
            key={`${index}-${movie.Title}`}
            movie={movie}
            style={{ width: "100%" }}
          />
        </>
      ))
    );

  return (
    <div>
      <Header />
      <Search search={search} />
      {/* <Movies /> */}

      <div className="movies" id="scrl1">
        {retrievedMovies}
      </div>
      <div className="movies" id="scrl2">
        {retrievedMovies}
      </div>
    </div>
  );
};

export default App;
