import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Home,
  Film,
  MonitorPlay,
  Heart,
  ShieldCheck,
  Gavel,
  Mail,
  Clapperboard,
  User,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 py-10 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left: Brand, About, Socials */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Clapperboard size={26} className="text-white" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-wide font-logo bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              WhisperFrame
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-300 max-w-md">
            Premium streaming experience. Watch your favorite movies and series anytime, on any device.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com/soumik.bag.394846/" target="_blank" aria-label="Facebook" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
              <Twitter size={20} />
            </a>
            <a href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=jbncy0p" target='_blank' aria-label="Instagram" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Right: Explore & Legal with Icons */}
        <div className="flex flex-col justify-between">
          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase tracking-wide text-purple-300">Explore</h3>
            <ul className="flex flex-wrap gap-6 text-sm">
              <li>
                <Link to="/" className="flex items-center gap-1 hover:text-purple-300 transition-colors duration-300">
                  <Home size={16} /> Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="flex items-center gap-1 hover:text-purple-300 transition-colors duration-300">
                  <Film size={16} /> Movies
                </Link>
              </li>
              <li>
                <Link to="/series" className="flex items-center gap-1 hover:text-purple-300 transition-colors duration-300">
                  <MonitorPlay size={16} /> Shows
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="flex items-center gap-1 hover:text-purple-300 transition-colors duration-300">
                  <Heart size={16} /> Favorites
                </Link>
              </li>
              <li>
                <Link to="/actor" className="flex items-center gap-1 hover:text-purple-300 transition-colors duration-300">
                  <User size={16} /> Actors
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="mt-8 md:mt-10">
            <h3 className="text-lg font-semibold mb-3 uppercase tracking-wide text-purple-300">Legal</h3>
            <ul className="flex flex-wrap gap-6 text-sm">
              <li>
                <Link to="/privacy" className="flex items-center gap-1 hover:text-purple-300 transition-colors duration-300">
                  <ShieldCheck size={16} /> Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center gap-1 hover:text-purple-300 transition-colors duration-300">
                  <Gavel size={16} /> Terms
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-1 hover:text-purple-300 transition-colors duration-300">
                  <Mail size={16} /> Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-500/20 mt-10 pt-5 text-center text-xs text-gray-400 tracking-wide">
        &copy; {new Date().getFullYear()} WhisperFrame. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
