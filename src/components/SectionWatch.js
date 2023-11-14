import { useContext } from "react";
import MovieList from "./MovieList";
import { MovieContext } from "../Contexts/MovieProvider";

function WhatToWatch() {
  const { topPicks } = useContext(MovieContext);
  return (
    <section className="sw">
      <div className="sw-header">
        <h2 className="sw-heading">Top Picks for you</h2>

        <h4 className="sw-sub-heading">Get Recommnedations</h4>
      </div>
      {topPicks && topPicks.length > 0 && <MovieList render={topPicks} />}
    </section>
  );
}

export default WhatToWatch;
