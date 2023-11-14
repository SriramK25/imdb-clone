import { useContext } from "react";
import { MovieContext } from "../Contexts/MovieProvider";

import { Link } from "react-router-dom";

function WatchList() {
  const { movieWatchlist } = useContext(MovieContext);
  if (movieWatchlist.length === 0)
    return (
      <div className="watchlist">
        <div>Add Movies to your watch list and see here 🙂</div>
      </div>
    );
  return (
    <ul className="watchlist list">
      {movieWatchlist.map((movie, index) => (
        <WatchListItem movie={movie} key={index} />
      ))}
    </ul>
  );
}

export default WatchList;

function WatchListItem({ movie }) {
  const { handleDelete } = useContext(MovieContext);
  return (
    <li className="item">
      <Link to={`/movie/${movie.imdbID}`} className="sw-link flex">
        <div className="item-image">
          {movie.Poster !== "N/A" ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : null}
        </div>
        <div className="item-details">
          <p className="item-name">
            {movie.Title} ({movie.Year})
          </p>
        </div>
      </Link>
      <button className="btn delete-btn" onClick={() => handleDelete(movie)}>
        &times;
      </button>
    </li>
  );
}
