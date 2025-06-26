import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MovieDetail from '../pages/MovieDetail';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound';
import Privacy from '../Legal/Privacy/Privacy';
import Contact from '../Legal/Contact';
import Terms from '../Legal/Terms/Terms';
import ScrollToTop from '../components/ScrollToTop'; 

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop /> {/* This ensures smooth scrolling to top on route change */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
