import { useState } from "react";

function Test() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("fresh");
  const [movie, setMovie] = useState("");

  function findMovie() {
    if (!input) return;
    setStatus("loading");

    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=6212b907&s=${input}&page=9`
          // `https://www.omdbapi.com/?apikey=6212b907&id=tt4212008`
        );

        if (!response.ok) {
          throw new Error("No Respose");
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error("Movie Not Found");
        }

        setMovie(data);
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

  if (status === "ready") console.log(movie);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => findMovie()}>Search</button>

      <div>
        {status === "fresh" && <p>Find Movie</p>}
        {status === "loading" && <p>Loading..</p>}
        {status === "ready" && <p>Movie Found</p>}
        {status === "error" && <p>Error While Fetching</p>}
        {status === "not found" && <p>No Such Movie</p>}
        {status === "unknown" && (
          <p>
            Something Went Wrong. Check Your Internet Connection and Try Again
          </p>
        )}
      </div>
    </div>
  );
}

export default Test;
