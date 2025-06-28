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
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#555879] text-[#F4EBD3] px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left: Brand, About, Socials */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Clapperboard size={26} />
            <h2 className="text-2xl font-extrabold tracking-wide font-logo">WhisperFrame</h2>
          </div>
          <p className="text-sm leading-relaxed text-[#DED3C4] max-w-md">
            Premium streaming experience. Watch your favorite movies and series anytime, on any device.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-white transition"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition"><Twitter size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition"><Instagram size={20} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-white transition"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Right: Explore & Legal with Icons */}
        <div className="flex flex-col justify-between">
          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-3 uppercase tracking-wide">Explore</h3>
            <ul className="flex flex-wrap gap-6 text-sm">
              <li><Link to="/" className="flex items-center gap-1 hover:underline hover:text-white transition"><Home size={16} /> Home</Link></li>
              <li><Link to="/movies" className="flex items-center gap-1 hover:underline hover:text-white transition"><Film size={16} /> Movies</Link></li>
              <li><Link to="/series" className="flex items-center gap-1 hover:underline hover:text-white transition"><MonitorPlay size={16} /> Shows</Link></li>
              <li><Link to="/favorites" className="flex items-center gap-1 hover:underline hover:text-white transition"><Heart size={16} /> Favorites</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="mt-8 md:mt-10">
            <h3 className="text-lg font-semibold mb-3 uppercase tracking-wide">Legal</h3>
            <ul className="flex flex-wrap gap-6 text-sm">
              <li><Link to="/privacy" className="flex items-center gap-1 hover:underline hover:text-white transition"><ShieldCheck size={16} /> Privacy</Link></li>
              <li><Link to="/terms" className="flex items-center gap-1 hover:underline hover:text-white transition"><Gavel size={16} /> Terms</Link></li>
              <li><Link to="/contact" className="flex items-center gap-1 hover:underline hover:text-white transition"><Mail size={16} /> Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#98A1BC]/30 mt-10 pt-5 text-center text-xs text-[#DED3C4] tracking-wide">
        &copy; {new Date().getFullYear()} WhisperFrame. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
