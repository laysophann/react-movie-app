import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";
import searchIcon from "./search-icon.svg";

const API_URL = "http://www.omdbapi.com/?apikey=67c1f16b";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
    console.log("movies data:", data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>Movie App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
