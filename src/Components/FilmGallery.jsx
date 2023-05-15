
import "../App.css";
import React, { useState,useEffect } from "react";
import axios from "axios";  
const FilmGallery = ({ isPopular }) => {
    const [film, setFilm] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    let filmCounter = film.length;
    const getValue = isPopular
      ? `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=${currentPage}`
      : `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=${currentPage}`;
  
    useEffect(() => {
      axios
        .get(getValue)
        .then((response) => {
          setFilm(response.data.results);
          setTotalPages(response.data.total_pages);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [currentPage, getValue]);
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <div className="film-container">
        <h1 className="film-counter">{filmCounter} titles</h1>
        <h1 className = "film-page">{currentPage} page</h1>
            {film.map((film) => (
        <div className="film" key={film.id}>
          <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} />
          <h1 className="movie-title">{film.title}</h1>
        </div>
      ))}
      <div className="page-buttons">
      <div className="film-previousPage"><button disabled={currentPage === 1} onClick={handlePrevPage}>PREVIOUS PAGE</button></div>
      <div className="film-nextPage"><button disabled={currentPage === totalPages} onClick={handleNextPage}>NEXT PAGE</button></div>
      </div>
    </div>
  );
};
export default FilmGallery;
