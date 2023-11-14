import { useContext } from "react";
import { MovieContext } from "../Contexts/MovieProvider";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { addMovie, movieWatchlist, openModal } = useContext(MovieContext);
  return (
    // THE WHOLE CARD
    <div className="card">
      {/* CARD IMAGE */}
      <Link to={`/movie/${movie.imdbID}`} className="sw-link">
        <div className="card-image-container">
          {movie.Poster !== "N/A" ? (
            <img
              src={movie.Poster}
              alt={`${movie.Title} Poster`}
              className="card-image"
            />
          ) : null}
          <div className="card-default"></div>
        </div>
      </Link>

      {/* CARD DETAILS LIKE NAME OF MOVIE AND YEAR OF RELEASE ETC... */}
      <div className="card-details">
        {/* MOVIE NAME */}
        <Link to={`/movie/${movie.imdbID}`} className="sw-link">
          <div className="card-title-container">
            <h4 className="card-title">{movie.Title}</h4>
          </div>
        </Link>

        {/* YEAR AND RATING */}
        <div className="card-rating">
          {/* RELEASE YEAR */}
          <p>
            <span>
              <ion-icon name="calendar-outline"></ion-icon>
            </span>
            {movie.Year}
          </p>

          {/* RATE BUTTON */}
          {movie.userRating === null ? (
            <button
              className="btn card-btn card-btn--userrating"
              onClick={() => openModal(movie)}
            >
              <ion-icon name="star-outline"></ion-icon>
            </button>
          ) : (
            // IF USER RATED THEN SHOWING THE RATING
            <>
              <p className="card-rating--num">
                <ion-icon name="star"></ion-icon>&nbsp;
                {movie.userRating}/10
                <span>You</span>
              </p>
            </>
          )}
        </div>

        {/* ADD TO WATCHLIST BUTTON */}
        <button
          className="btn card-btn "
          onClick={() => {
            const isfound = movieWatchlist.find((mov) => {
              return mov.imdbID === movie.imdbID;
            });

            if (isfound) {
              return;
            }

            addMovie(movie);
          }}
          disabled={movie.isWatchlisted}
        >
          {movie.isWatchlisted ? "Watchlisted" : "+ Watchlist"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
