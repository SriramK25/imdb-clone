import { useContext, useState } from "react";
import WatchList from "./WatchList";
import { MovieContext } from "../Contexts/MovieProvider";

function NavBar({ useInput = true, showForm = true }) {
  const { findMovie } = useContext(MovieContext);

  const [input, setInput] = useState("");
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  function showWatchlist(e) {
    e.preventDefault();

    setIsWatchlistOpen((current) => !current);
  }

  return (
    <nav className={`nav ${showForm ? "" : "nav-padding"}`} id="nav">
      <ion-icon name="menu-outline" class="nav-icon nav-icon--menu"></ion-icon>
      <h2 className="nav-heading">OMDb</h2>
      {showForm && (
        <form
          className="nav-form"
          onSubmit={(e) => {
            e.preventDefault();
            findMovie(input);
            setInput("");
          }}
        >
          <input
            className={`nav-form-input`}
            value={input}
            placeholder="Search..."
            onChange={(e) => setInput(e.target.value)}
            disabled={!useInput}
          />
          <button className="btn nav-form-btn">
            <ion-icon
              name="search-outline"
              class="nav-icon nav-icon--search"
            ></ion-icon>
          </button>
        </form>
      )}
      <div className="item-container">
        <button className="btn nav-btn" onClick={showWatchlist}>
          Watchlist
          <ion-icon
            name="caret-down-outline"
            class="nav-icon nav-icon--down"
          ></ion-icon>
        </button>
        {isWatchlistOpen ? <WatchList /> : null}
      </div>
    </nav>
  );
}

export default NavBar;
