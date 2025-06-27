import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  Film,
  MonitorPlay,
  Heart,
  LogIn,
  UserPlus,
  Clapperboard
} from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#555879] text-[#F4EBD3] shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 font-logo text-2xl md:text-3xl font-bold tracking-wide">
          <Clapperboard size={26} />
          <span>WhisperFrame</span>
        </Link>

        {/* Search (hidden on small screens) */}
        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search movies or series..."
            className="w-full px-4 py-2 rounded-md bg-[#DED3C4] text-[#555879] placeholder:text-[#555879] focus:outline-none focus:ring-2 focus:ring-[#98A1BC]"
          />
        </div>

        {/* Desktop Nav + Auth */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-4 text-sm font-medium">
            <Link to="/" className="flex items-center gap-1 hover:text-white transition">
              <Home size={16} /> Home
            </Link>
            <Link to="/movies" className="flex items-center gap-1 hover:text-white transition">
              <Film size={16} /> Movies
            </Link>
            <Link to="/series" className="flex items-center gap-1 hover:text-white transition">
              <MonitorPlay size={16} /> Series
            </Link>
            <Link to="/favorites" className="flex items-center gap-1 hover:text-white transition">
              <Heart size={16} /> Favorites
            </Link>
          </nav>
          <div className="flex space-x-3 ml-4">
            <Link
              to="/login"
              className="flex items-center gap-1 bg-[#F4EBD3] text-[#555879] font-semibold px-4 py-1.5 rounded-md hover:bg-[#DED3C4] transition"
            >
              <LogIn size={16} /> Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-1 border border-[#F4EBD3] text-[#F4EBD3] font-semibold px-4 py-1.5 rounded-md hover:bg-[#F4EBD3] hover:text-[#555879] transition"
            >
              <UserPlus size={16} /> Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-[#555879] text-[#F4EBD3]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-md bg-[#DED3C4] text-[#555879] placeholder:text-[#555879] focus:outline-none focus:ring-2 focus:ring-[#98A1BC]"
          />
          <nav className="flex flex-col space-y-2 text-sm font-medium mt-2">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-white transition">
              <Home size={16} /> Home
            </Link>
            <Link to="/movies" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-white transition">
              <Film size={16} /> Movies
            </Link>
            <Link to="/series" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-white transition">
              <MonitorPlay size={16} /> Series
            </Link>
            <Link to="/favorites" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-white transition">
              <Heart size={16} /> Favorites
            </Link>
          </nav>
          <div className="flex space-x-3 mt-3">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-1/2 flex justify-center items-center gap-1 bg-[#F4EBD3] text-[#555879] font-semibold py-2 rounded-md hover:bg-[#DED3C4] transition"
            >
              <LogIn size={16} /> Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-1/2 flex justify-center items-center gap-1 border border-[#F4EBD3] text-[#F4EBD3] font-semibold py-2 rounded-md hover:bg-[#F4EBD3] hover:text-[#555879] transition"
            >
              <UserPlus size={16} /> Sign Up
            </Link>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
