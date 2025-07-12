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
import IndianMovie from '../pages/IndianMovie/IndianMovie';
import IndianShow from '../pages/IndianShow/IndianShow';

// 🔹 Actor Components
import ActorDetails from '../pages/ActorDetails/ActorDetails';
import Actor from '../pages/ActorDetails/Actor';

// 🔹 Legal Pages
import Privacy from '../Legal/Privacy/Privacy';
import Contact from '../Legal/Contact/Contact';
import Terms from '../Legal/Terms/Terms';

// 🔹 Utility Components
import ScrollToTop from '../components/ScrollToTop';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';


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
        {/* 🔸 Home Page - Public */}
        <Route path="/" element={<Home />} />

        {/* 🎬 Movie Routes - Protected */}
        <Route path="/movies" element={
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        } />
        <Route path="/movie/:id" element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        } />
        <Route path="/indian-movies" element={
          <ProtectedRoute>
            <IndianMovie />
          </ProtectedRoute>
        } />

        {/* 📺 Series Routes - Protected */}
        <Route path="/series" element={
          <ProtectedRoute>
            <Series />
          </ProtectedRoute>
        } />
        <Route path="/series/:id" element={
          <ProtectedRoute>
            <SeriesDetails />
          </ProtectedRoute>
        } />
        <Route path="/indian-show" element={
          <ProtectedRoute>
            <IndianShow />
          </ProtectedRoute>
        } />

        {/* 🔐 Authentication Routes - Public Only */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />

        {/* 📜 Legal Pages - Public */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />

        {/* 🔍 Search & Favorites - Protected */}
        <Route path="/search" element={
          <ProtectedRoute>
            <SearchResults />
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        } />

        {/* 👤 Actor Related Routes - Protected */}
        <Route path="/actor" element={
          <ProtectedRoute>
            <Actor />
          </ProtectedRoute>
        } />
        <Route path="/actor/:id" element={
          <ProtectedRoute>
            <ActorDetails />
          </ProtectedRoute>
        } />

        {/* 🎭 Genre Page - Protected */}
        <Route path="/genre/:id" element={
          <ProtectedRoute>
            <Genre />
          </ProtectedRoute>
        } />
        
        {/* 🚫 NotFound Page - Public */}
        <Route path="/404" element={<NotFound />} />
        
        {/* 🚫 Catch-All NotFound Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;