import { createContext, useEffect, useState } from "react";

const data = [
  {
    Title: "Leo",
    Year: "2023",
    imdbID: "tt15654328",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDk0ZmVmMTktOGNiNS00Yzg5LWIzZTAtNjUxZWZhZDljY2Y0XkEyXkFqcGdeQXVyMTY1MzAyNjU4._V1_SX300.jpg",
  },
  {
    Title: "Thunivu",
    Year: "2023",
    imdbID: "tt15163652",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BY2M0ODYyOGEtZWMyMC00NWM5LWJiNjEtNjBlYTEzNGZjOTk0XkEyXkFqcGdeQXVyMTY1MzAyNjU4._V1_SX300.jpg",
  },
  {
    Title: "Vaathi",
    Year: "2023",
    imdbID: "tt15427980",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTA0OTkxZjEtNTgwZC00NDgwLTljNDAtODhlMDBmMzU0N2EzXkEyXkFqcGdeQXVyMTMzNzIyNDc1._V1_SX300.jpg",
  },
  {
    Title: "Interstellar",
    Year: "2014",
    imdbID: "tt0816692",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  },
  {
    Title: "Varisu",
    Year: "2023",
    imdbID: "tt11998558",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYzQ1NmM3NTktY2RmMS00NzgxLWFiZjktM2JjYzY5N2IxNmIzXkEyXkFqcGdeQXVyMTMzNzIyNDc1._V1_SX300.jpg",
  },
  {
    Title: "Vikram",
    Year: "2022",
    imdbID: "tt9179430",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDRiOWNjYjUtMDI0ZC00MDMyLTkwZDItNTU5NWQ1NjEyNGYxXkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_SX300.jpg",
  },
  {
    Title: "Kaithi 2",
    Year: "2024",
    imdbID: "tt11230960",
    Type: "movie",
    // Poster:
    //   "https://m.media-amazon.com/images/M/MV5BMTI5NTZjZTItMTU4NS00ZjFlLWFiOTktMGU0ZmEzYTJkMDA1XkEyXkFqcGdeQXVyMTUxOTIzNDA1._V1_SX300.jpg",
    Poster: "N/A",
  },
  {
    Title: "Kaithi",
    Year: "2019",
    imdbID: "tt9900782",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZTVlNGY2YTEtNTlmYy00NzY0LWE1NWUtOGJiNTgxZGM4ZmMzXkEyXkFqcGdeQXVyMTY1MzAyNjU4._V1_SX300.jpg",
  },
  {
    Title: "Ponniyin Selvan: Part Two",
    Year: "2023",
    imdbID: "tt22444570",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNmQ3NGM5ODMtNDhjYS00MDQwLWEwNjItNjZiNjdkMmQ3NjQzXkEyXkFqcGdeQXVyMTY0MDk0NjE3._V1_SX300.jpg",
  },
  {
    Title: "Viduthalai: Part 1",
    Year: "2023",
    imdbID: "tt11396310",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjZhY2M5YjAtNDQ4NS00MDExLTlhMjctMmZmZmVkMTI3MjA4XkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_SX300.jpg",
  },
];

const MovieContext = createContext();

function MovieProvider({ children }) {
  const defaultMovie = addProperties(data);
  const [topPicks] = useState(defaultMovie);

  const [movieWatchlist, setMovieWatchlist] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalData, setModalData] = useState({});

  const [searchResult, setSearchResult] = useState([]);
  const [status, setStatus] = useState("fresh");

  const BASE_URL = "https://www.omdbapi.com/";
  const API_KEY = "6212b907";

  function findMovie(input, type = "s", page = 1) {
    if (!input) return;
    setStatus("loading");

    async function fetchMovie() {
      try {
        const response = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&${type}=${input}&page=${page}`
          // `https://www.omdbapi.com/?apikey=6212b907&id=tt4212008`
        );

        console.log(response);
        if (!response.ok) {
          throw new Error("No Respose");
        }

        const data = await response.json();
        console.log(data);

        if (data.Response === "False") {
          throw new Error("Movie Not Found");
        }

        const movies = addProperties(data.Search);
        console.log(movies);

        setSearchResult(movies);
        setStatus("ready");
      } catch (err) {
        setStatus("unknown");
        console.log(err.message);
        err.message === "Movie Not Found" && setStatus("not found");
        err.message === "No Response" && setStatus("error");
      }
    }

    fetchMovie();
  }

  function addProperties(data) {
    return data.map((movie) => ({
      ...movie,
      isWatchlisted: false,
      userRating: null,
    }));
  }

  function addMovie(movie) {
    movie.isWatchlisted = !movie.isWatchlisted;
    setMovieWatchlist((arr) => [...arr, movie]);
  }

  function handleDelete(movie) {
    movie.isWatchlisted = !movie.isWatchlisted;
    setMovieWatchlist((movies) =>
      movies.filter((mov) => mov.imdbID !== movie.imdbID)
    );
  }

  function openModal(movie) {
    setIsModalOpen(!isModalOpen);
    setModalData(movie);
    console.log(isModalOpen);
  }

  function handleRating(movie, rating) {
    movie.userRating = rating;
    console.log(movie);
  }

  function deleteAllWatchlist() {
    movieWatchlist.forEach((movie) => (movie.isWatchlisted = false));
    setMovieWatchlist([]);
  }

  function goToTop(navRef) {
    if (!navRef.current) return;
    console.log(navRef.current);

    navRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <MovieContext.Provider
      value={{
        movieWatchlist,
        setMovieWatchlist,
        handleDelete,
        addMovie,
        topPicks,
        isModalOpen,
        setIsModalOpen,
        openModal,
        modalData,
        handleRating,
        deleteAllWatchlist,
        findMovie,
        status,
        searchResult,
        addProperties,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export { MovieProvider, MovieContext };
