import { useContext } from "react";
import MovieList from "./MovieList";
import { MovieContext } from "../Contexts/MovieProvider";
import Loading from "./Loading";
import Error from "./Error";

function SectionSearch() {
  const { searchResult, status } = useContext(MovieContext);
  return (
    <>
      {status === "fresh" ? null : (
        <section className="sw">
          <div className="sw-header">
            <h2 className="sw-heading">Search Results</h2>

            <h4 className="sw-sub-heading">Get Recommnedations</h4>
          </div>

          {status === "loading" && <Loading />}

          {status === "ready" && <MovieList render={searchResult} />}

          {status === "unknown" && (
            <Error text="Something Went Wrong. Check Your Internet Connection and Try again" />
          )}

          {status === "not found" && (
            <Error text="Movie Not found or No such movie Filmed yet" />
          )}

          {status === "error" && <Error text="No Response from Server" />}
        </section>
      )}
    </>
  );
}

export default SectionSearch;
