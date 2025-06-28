import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import MovieDetail from '../pages/Movie/MovieDetail';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/signUp';
import NotFound from '../pages/NotFound';
import Privacy from '../Legal/Privacy/Privacy';
import Contact from '../Legal/Contact/Contact';
import Terms from '../Legal/Terms/Terms';
import ScrollToTop from '../components/ScrollToTop'; 
import Movies from '../pages/Movie/Movies';
import Series from '../pages/Series/Series';
import SeriesDetails from '../pages/Series/SeriesDetails';
import SearchResults from '../pages/SearchResults';
import Favorites from '../pages/Favorites';
import ActorDetails from '../pages/ActorDetails/ActorDetails';
import Actor from '../pages/ActorDetails/Actor'; 
// Assuming this is the actor section component

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop /> {/* This ensures smooth scrolling to top on route change */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/actor/:id" element={<ActorDetails />} />
        <Route path="/actor" element={<Actor />} /> 
      </Routes>
    </>
  );
};

export default AppRoutes;
