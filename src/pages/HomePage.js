import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SectionSearch from "../components/SectionSearch";
import SectionWatch from "../components/SectionWatch";
import SectionWatchlist from "../components/SectionWatchlist";
import UserRating from "../components/UserRating";

function HomePage() {
  return (
    <div>
      <NavBar />
      <SectionSearch />
      <SectionWatch />
      <SectionWatchlist />
      <UserRating />
      <Footer />
    </div>
  );
}

export default HomePage;
