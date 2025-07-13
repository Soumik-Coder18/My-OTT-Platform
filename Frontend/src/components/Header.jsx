import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import {
  Menu,
  X,
  Home,
  Film,
  MonitorPlay,
  Heart,
  LogIn,
  UserPlus,
  Clapperboard,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/search', search: `?query=${searchTerm}` } } });
      return;
    }

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&language=en-US&page=1&include_adult=false`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        }
      );
      navigate(`/search?query=${searchTerm}`, {
        state: { results: res.data.results },
      });
      setSearchTerm('');
      setIsMobileMenuOpen(false); // optional: close mobile menu after search
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/90 backdrop-blur-md border-b border-purple-500/20' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 font-logo text-2xl md:text-3xl font-bold tracking-wide"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Clapperboard size={26} className="text-white" />
          </div>
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            WhisperFrame
          </span>
        </Link>

        {/* Search (Desktop) - Only for authenticated users */}
        {isAuthenticated && (
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 mx-6"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search movies or shows..."
              className="w-full px-4 py-2 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </form>
        )}

        {/* Desktop Nav + Auth */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Navigation - Show for all users but redirect unauthenticated to login */}
          <nav className="flex space-x-4 text-sm font-medium">
            <Link to="/" className="flex items-center gap-1 text-white hover:text-purple-300 transition">
              <Home size={16} /> Home
            </Link>
            <Link 
              to={isAuthenticated ? "/movies" : "/login"} 
              onClick={(e) => {
                if (!isAuthenticated) {
                  e.preventDefault();
                  navigate('/login', { state: { from: { pathname: '/movies' } } });
                }
              }}
              className="flex items-center gap-1 text-white hover:text-purple-300 transition"
            >
              <Film size={16} /> Movies
            </Link>
            <Link 
              to={isAuthenticated ? "/series" : "/login"}
              onClick={(e) => {
                if (!isAuthenticated) {
                  e.preventDefault();
                  navigate('/login', { state: { from: { pathname: '/series' } } });
                }
              }}
              className="flex items-center gap-1 text-white hover:text-purple-300 transition"
            >
              <MonitorPlay size={16} /> Shows
            </Link>
            <Link 
              to={isAuthenticated ? "/actor" : "/login"}
              onClick={(e) => {
                if (!isAuthenticated) {
                  e.preventDefault();
                  navigate('/login', { state: { from: { pathname: '/actor' } } });
                }
              }}
              className="flex items-center gap-1 text-white hover:text-purple-300 transition"
            >
              <User size={16} /> Actors
            </Link>
            <Link 
              to={isAuthenticated ? "/favorites" : "/login"}
              onClick={(e) => {
                if (!isAuthenticated) {
                  e.preventDefault();
                  navigate('/login', { state: { from: { pathname: '/favorites' } } });
                }
              }}
              className="flex items-center gap-1 text-white hover:text-purple-300 transition"
            >
              <Heart size={16} /> Favorites
            </Link>
          </nav>
          
          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="relative ml-4" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-1.5 rounded-md hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <User size={16} />
                <span>{user?.username || 'Profile'}</span>
                <ChevronDown size={14} />
              </button>
              
              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-md rounded-md shadow-lg py-1 z-50 border border-purple-500/20">
                  <div className="px-4 py-2 text-sm text-white border-b border-purple-500/20">
                    <div className="font-semibold">{user?.username}</div>
                    <div className="text-xs text-gray-300">{user?.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-500/20 transition flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-1.5 rounded-md hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <LogIn size={16} /> Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-1 border border-purple-500 text-white font-semibold px-4 py-1.5 rounded-md hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                <UserPlus size={16} /> Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-purple-900/80 to-pink-900/80 backdrop-blur-md border-t border-purple-500/30">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            {isAuthenticated && (
              <form onSubmit={handleSearch} className="mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search movies or shows..."
                  className="w-full px-4 py-2 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </form>
            )}

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className="flex items-center gap-2 text-white hover:text-purple-300 transition py-2"
              >
                <Home size={16} /> Home
              </Link>
              <Link 
                to={isAuthenticated ? "/movies" : "/login"} 
                onClick={(e) => {
                  closeMobileMenu();
                  if (!isAuthenticated) {
                    e.preventDefault();
                    navigate('/login', { state: { from: { pathname: '/movies' } } });
                  }
                }}
                className="flex items-center gap-1 text-white hover:text-purple-300 transition py-2"
              >
                <Film size={16} /> Movies
              </Link>
              <Link 
                to={isAuthenticated ? "/series" : "/login"}
                onClick={(e) => {
                  closeMobileMenu();
                  if (!isAuthenticated) {
                    e.preventDefault();
                    navigate('/login', { state: { from: { pathname: '/series' } } });
                  }
                }}
                className="flex items-center gap-2 text-white hover:text-purple-300 transition py-2"
              >
                <MonitorPlay size={16} /> Shows
              </Link>
              <Link 
                to={isAuthenticated ? "/favorites" : "/login"}
                onClick={(e) => {
                  closeMobileMenu();
                  if (!isAuthenticated) {
                    e.preventDefault();
                    navigate('/login', { state: { from: { pathname: '/favorites' } } });
                  }
                }}
                className="flex items-center gap-2 text-white hover:text-purple-300 transition py-2"
              >
                <Heart size={16} /> Favorites
              </Link>
              <Link 
                to={isAuthenticated ? "/actor" : "/login"}
                onClick={(e) => {
                  closeMobileMenu();
                  if (!isAuthenticated) {
                    e.preventDefault();
                    navigate('/login', { state: { from: { pathname: '/actor' } } });
                  }
                }}
                className="flex items-center gap-2 text-white hover:text-purple-300 transition py-2"
              >
                <User size={16} /> Actors
              </Link>
            </nav>

            {/* Mobile Auth */}
            {isAuthenticated ? (
              <div className="pt-4 border-t border-purple-500/20">
                <div className="text-white text-sm mb-2">
                  <div className="font-semibold">{user?.username}</div>
                  <div className="text-gray-300">{user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white hover:text-purple-300 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-purple-500/20 space-y-2">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-md hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <LogIn size={16} /> Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 border border-purple-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  <UserPlus size={16} /> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
