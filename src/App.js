import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import { MovieProvider } from "./Contexts/MovieProvider";
function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route
            path="*"
            element={
              <div className="not-found">
                <h2>Page Not Found 😕</h2>
                <p>
                  Try checking the link for any typos or Please Reload the
                  page😉
                </p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}

// import Test2 from "./Test/Test2";

// function App() {
//   return <Test2 />;
// }

export default App;
