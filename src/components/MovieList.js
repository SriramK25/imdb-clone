import MovieCard from "./MovieCard";

function MovieList({ render }) {
  return (
    <div className="sw-container">
      <div className="sw-container--overlay overlay-1"></div>
      <ul className="sw-list">
        {render.map((movie, index) => (
          <li key={index}>
            <MovieCard movie={movie} />
          </li>
        ))}
        <div className="sw-container--overlay overlay-2"></div>
      </ul>
    </div>
  );
}

export default MovieList;
