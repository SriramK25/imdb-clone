import { useContext } from "react";
import MovieList from "./MovieList";
import { MovieContext } from "../Contexts/MovieProvider";

function SectionWatchlist() {
  const { movieWatchlist, deleteAllWatchlist } = useContext(MovieContext);
  return (
    <section className="sw">
      <div className="sw-header">
        <h2 className="sw-heading">From Your Watchlist</h2>

        <button
          className="btn clear-btn"
          onClick={() => {
            if (movieWatchlist.length === 0) return;
            const isOk = window.confirm(
              "Do Yo want to delete all the movies from your watchlist"
            );

            if (!isOk) return;
            deleteAllWatchlist();
          }}
        >
          Clear Watchlist&nbsp;<ion-icon name="trash-bin"></ion-icon>
        </button>
      </div>
      {movieWatchlist.length > 0 ? (
        <MovieList render={movieWatchlist} />
      ) : (
        <div className="sw-empty">
          <ion-icon name="bookmark"></ion-icon>
          <h3 className="sw-empty--text">
            Save shows and movies to keep track of what you want to watch.
          </h3>
        </div>
      )}
    </section>
  );
}

export default SectionWatchlist;
