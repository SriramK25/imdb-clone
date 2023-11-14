import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SectionWatch from "../components/SectionWatch";
import { MovieContext } from "../Contexts/MovieProvider";
import UserRating from "../components/UserRating";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

function MoviePage() {
  const { movieWatchlist, addMovie, openModal, addProperties } =
    useContext(MovieContext);

  const [{ movie, status }, setMovie] = useState({
    movie: {},
    status: "fresh",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setMovie((cur) => ({ ...cur, status: "loading" }));
    async function fetchMovie() {
      try {
        const response = await fetch(
          // `${BASE_URL}?apikey=${API_KEY}&${type}=${input}`
          `https://www.omdbapi.com/?apikey=6212b907&i=${id}`
        );
        if (!response.ok) {
          throw new Error("No Respose");
        }

        const data = await response.json();
        if (data.Response === "False") {
          throw new Error("Movie Not Found");
        }
        const formatted = addProperties([data]);

        setMovie((cur) => ({ ...cur, movie: formatted[0], status: "ready" }));
      } catch (err) {
        setMovie((cur) => ({ ...cur, status: "unknown" }));
        console.log(err.message);
        err.message === "Movie Not Found" &&
          setMovie((cur) => ({ ...cur, status: "not found" }));
        err.message === "No Response" &&
          setMovie((cur) => ({ ...cur, status: "error" }));
      }
    }

    fetchMovie();
  }, [id]);

  return (
    <>
      <NavBar showForm={false} />

      {status === "loading" && <Loading className="big" />}

      {status === "ready" && (
        <>
          <button onClick={() => navigate(-1)} className="btn back">
            Back
          </button>
          <div className="movie">
            <div className="movie-header">
              <div className="movie-image-container">
                {movie.Poster !== "N/A" ? (
                  <img
                    src={movie.Poster}
                    alt={`${movie.Title} Poster`}
                    className="card-image"
                  />
                ) : null}
                <div className="card-default"></div>
              </div>
              <div className="movie-summary">
                <div className="movie-aside">
                  <h2 className="movie-name">{movie.Title}</h2>
                  <p className="movie-year">{movie.Released.slice(-4)}</p>
                </div>
                <div className="movie-likes">
                  <p className="movie-likes-num">
                    <ion-icon name="thumbs-up-outline"></ion-icon>{" "}
                    {movie.imdbVotes}
                  </p>
                  <p className="movie-likes-type">{movie.Type}</p>
                </div>
                <div className="movie-rating">
                  <p className="movie-rating-imdb ">
                    <ion-icon name="star"></ion-icon>&nbsp; {movie.imdbRating}
                    /10
                  </p>
                  {movie.userRating === null ? (
                    <button
                      className="btn card-btn card-btn--userrating movie-rating-user"
                      onClick={() => openModal(movie)}
                    >
                      <ion-icon name="star-outline"></ion-icon> Rate
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
                <button
                  className="btn card-btn movie-rating-watchlist"
                  onClick={() => {
                    const isfound = movieWatchlist.find(
                      (mov) => mov.imdbID === movie.imdbID
                    );

                    console.log(isfound);

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

            <div className="movie-plot">
              <h2 className="sw-heading">Plot</h2>
              <p className="movie-plot--text">{movie.Plot}</p>

              <p className="movie-director">
                Directed by <span>{movie.Director}</span>
              </p>
              {movie.Rated !== "Not Rated" && movie.Rated !== "N/A" ? (
                <span className="movie-age">{movie.Rated}</span>
              ) : null}
            </div>

            <div className="movie-content">
              <h2 className="sw-heading">Movie Details</h2>

              <div className="movie-detail">
                <ul>
                  <li className="movie-detail--item movie-detail--genre">
                    <span>Genre</span>
                    <p>{movie.Genre}</p>
                  </li>
                  <li className="movie-detail--item movie-detail--actors">
                    <span>Actors</span>
                    <p>{movie.Actors}</p>
                  </li>
                  <li className="movie-detail--item">
                    <span>Country</span>
                    <p>{movie.Country}</p>
                  </li>
                  <li className="movie-detail--item">
                    <span>Language</span>
                    <p>{movie.Language}</p>
                  </li>
                  <li className="movie-detail--item movie-detail--released">
                    <span>Released</span>
                    <p>{movie.Released}</p>
                  </li>
                  <li className="movie-detail--item movie-detail--runtime">
                    <span>Runtime</span>
                    <p>{movie.Runtime}</p>
                  </li>
                  <li className="movie-detail--item movie-detail--boxoffice">
                    <span>Box Office</span>
                    <p>
                      {movie.BoxOffice !== "N/A"
                        ? movie.BoxOffice
                        : "Not Available"}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {status === "unknown" && (
        <Error text="Something Went Wrong. Check Your Internet Connection and Try again" />
      )}

      {status === "not found" && (
        <Error text="Movie Not found or No such movie Filmed yet" />
      )}

      {status === "error" && <Error text="No Response from Server" />}
      <SectionWatch />
      <UserRating />
      <Footer />
    </>
  );
}

export default MoviePage;
