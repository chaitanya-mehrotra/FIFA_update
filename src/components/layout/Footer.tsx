import { Link } from 'react-router-dom';
import { Trophy, Globe, MessageSquare, Video, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-fifa-navy border-t border-white/10 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fifa-gold to-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-fifa-gold/20">
                <Trophy className="w-5 h-5 text-fifa-navy" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white tracking-tight leading-none group-hover:text-fifa-gold transition-colors">
                  FIFA WORLD CUP
                </span>
                <span className="text-xs font-bold text-fifa-gold tracking-[0.2em] leading-none mt-1">
                  2026™
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
              The complete tournament platform for the biggest football event in history.
              Hosted across 3 nations, featuring 48 teams, delivering 104 unforgettable matches.
            </p>
            <div className="flex gap-3">
              <img src="https://flagcdn.com/w40/us.png" alt="USA" className="w-8 h-5 rounded object-cover shadow-sm ring-1 ring-white/10" />
              <img src="https://flagcdn.com/w40/mx.png" alt="Mexico" className="w-8 h-5 rounded object-cover shadow-sm ring-1 ring-white/10" />
              <img src="https://flagcdn.com/w40/ca.png" alt="Canada" className="w-8 h-5 rounded object-cover shadow-sm ring-1 ring-white/10" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Tournament</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/fixtures" className="text-gray-400 hover:text-fifa-gold transition-colors">Matches & Fixtures</Link></li>
              <li><Link to="/group-stage" className="text-gray-400 hover:text-fifa-gold transition-colors">Group Standings</Link></li>
              <li><Link to="/knockout" className="text-gray-400 hover:text-fifa-gold transition-colors">Knockout Bracket</Link></li>
              <li><Link to="/teams" className="text-gray-400 hover:text-fifa-gold transition-colors">Participating Teams</Link></li>
              <li><Link to="/predictions" className="text-gray-400 hover:text-fifa-gold transition-colors">Predictor Game</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Connect</h3>
            <div className="flex gap-3">
              {[MessageSquare, Video, Globe, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-fifa-gold hover:text-fifa-navy transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 FIFA World Cup Platform. All rights reserved. Not affiliated with FIFA.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-fifa-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-fifa-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
