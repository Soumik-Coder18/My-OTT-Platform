// ==========================================
// 📦 Importing Required Libraries & Components
// ==========================================
import { Routes, Route } from 'react-router-dom';

// 🔹 Page Components
import Home from '../pages/Home/Home';
import MovieDetail from '../pages/Movie/MovieDetail';
import Movies from '../pages/Movie/Movies';
import Series from '../pages/Series/Series';
import SeriesDetails from '../pages/Series/SeriesDetails';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/signUp';
import NotFound from '../pages/NotFound';
import SearchResults from '../pages/SearchResults';
import Favorites from '../pages/Favorites';
import Genre from '../pages/Genre';

// 🔹 Actor Components
import ActorDetails from '../pages/ActorDetails/ActorDetails';
import Actor from '../pages/ActorDetails/Actor';

// 🔹 Legal Pages
import Privacy from '../Legal/Privacy/Privacy';
import Contact from '../Legal/Contact/Contact';
import Terms from '../Legal/Terms/Terms';

// 🔹 Utility Components
import ScrollToTop from '../components/ScrollToTop';


// ==========================================
// 🔀 AppRoutes Component - Handles All Routing
// ==========================================
const AppRoutes = () => {
  return (
    <>
      {/* 🆙 Auto-scroll to top on route change */}
      <ScrollToTop />

      {/* 🌐 Defining All App Routes */}
      <Routes>
        {/* 🔸 Home Page */}
        <Route path="/" element={<Home />} />

        {/* 🎬 Movie Routes */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />

        {/* 📺 Series Routes */}
        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SeriesDetails />} />

        {/* 🔐 Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 📜 Legal Pages */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />

        {/* 🔍 Search & Favorites */}
        <Route path="/search" element={<SearchResults />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* 👤 Actor Related Routes */}
        <Route path="/actor" element={<Actor />} />
        <Route path="/actor/:id" element={<ActorDetails />} />

        {/* 🎭 Genre Page */ }
        <Route path="/genre/:id" element={<Genre />} />
        {/* 🚫 Catch-All NotFound Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;