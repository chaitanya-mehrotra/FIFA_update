import { motion } from 'framer-motion';
import { Info, Trophy, Globe, Code, Users, Heart, MapPin, Layers, Cpu, Palette } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-black text-white">
          About This Platform
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Your complete guide to the FIFA World Cup 2026™
        </p>
      </motion.div>

      {/* Tournament Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 lg:p-8"
      >
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-fifa-gold" /> Tournament Overview
        </h2>
        <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
          <p>
            The <strong className="text-white">FIFA World Cup 2026™</strong> will be the 23rd edition of the
            FIFA World Cup, the quadrennial international men's football championship contested by the
            national teams of the member associations of FIFA.
          </p>
          <p>
            For the first time, the tournament will be hosted by three countries: the <strong className="text-white">United States</strong>,
            <strong className="text-white"> Mexico</strong>, and <strong className="text-white">Canada</strong>.
            It will also be the first edition to feature <strong className="text-fifa-gold">48 teams</strong>,
            expanded from the previous 32-team format.
          </p>
          <p>
            Matches will be played across <strong className="text-white">16 venues</strong> in all three
            host nations, from June 11 to July 19, 2026.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { icon: Globe, label: 'Host Countries', value: '3' },
            { icon: Users, label: 'Teams', value: '48' },
            { icon: MapPin, label: 'Venues', value: '16' },
            { icon: Trophy, label: 'Total Matches', value: '104' },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 bg-white/5 rounded-lg border border-white/5">
              <item.icon className="w-5 h-5 text-fifa-gold mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{item.value}</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Competition Format */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card p-6 lg:p-8"
      >
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-fifa-gold" /> Competition Format
        </h2>
        <div className="space-y-4">
          {[
            { phase: 'Group Stage', detail: '12 groups of 4 teams. Each team plays 3 matches. Top 2 from each group plus 8 best third-placed teams advance.' },
            { phase: 'Round of 32', detail: '32 teams compete in single-elimination matches. Winners advance to the Round of 16.' },
            { phase: 'Round of 16', detail: '16 remaining teams face off. Winners progress to the Quarter Finals.' },
            { phase: 'Quarter Finals', detail: '8 teams compete for a spot in the Semi Finals.' },
            { phase: 'Semi Finals', detail: '4 teams battle for a place in the Final.' },
            { phase: 'Third Place & Final', detail: 'The losers of the Semi Finals play for third place. The winners compete in the grand Final.' },
          ].map((item, idx) => (
            <div key={item.phase} className="flex gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-8 h-8 rounded-full bg-fifa-gold/20 border border-fifa-gold/30 flex items-center justify-center text-xs font-bold text-fifa-gold">
                  {idx + 1}
                </div>
                {idx < 5 && <div className="w-px h-full bg-white/10 mt-1" />}
              </div>
              <div className="pb-4">
                <h3 className="text-sm font-bold text-white">{item.phase}</h3>
                <p className="text-xs text-gray-400 mt-1">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 lg:p-8"
      >
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-fifa-gold" /> Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Complete Fixtures', desc: 'All 104 matches with dates, times, venues, and live status updates' },
            { title: 'Group Standings', desc: 'Real-time group tables with automatic sorting and goal difference calculation' },
            { title: 'Knockout Bracket', desc: 'Visual tournament bracket from Round of 32 to the Final' },
            { title: 'Team Profiles', desc: '48 team cards with rankings, coaches, and confederation info' },
            { title: 'Interactive Predictions', desc: 'Predict match scores and the champion — saved locally' },
            { title: 'Rich Statistics', desc: 'Charts and dashboards for goals, possession, clean sheets and more' },
            { title: 'Match Details', desc: 'Detailed match pages with timeline, events, and head-to-head stats' },
            { title: 'Responsive Design', desc: 'Optimized for desktop, tablet, and mobile viewing' },
          ].map((feature) => (
            <div key={feature.title} className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-fifa-gold/20 transition-colors">
              <h3 className="text-sm font-bold text-white mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card p-6 lg:p-8"
      >
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
          <Cpu className="w-5 h-5 text-fifa-gold" /> Technology Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: 'React 19', desc: 'UI Framework' },
            { name: 'TypeScript', desc: 'Type Safety' },
            { name: 'Tailwind CSS 4', desc: 'Styling' },
            { name: 'Framer Motion', desc: 'Animations' },
            { name: 'Recharts', desc: 'Data Visualization' },
            { name: 'React Router', desc: 'Navigation' },
            { name: 'Vite', desc: 'Build Tool' },
            { name: 'Lucide Icons', desc: 'Icon Library' },
            { name: 'LocalStorage', desc: 'Persistence' },
          ].map((tech) => (
            <div key={tech.name} className="p-3 bg-white/5 rounded-lg text-center border border-white/5">
              <div className="text-sm font-bold text-white">{tech.name}</div>
              <div className="text-[11px] text-gray-400">{tech.desc}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Credits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 lg:p-8 text-center bg-gradient-to-br from-fifa-gold/5 to-transparent"
      >
        <Heart className="w-8 h-8 text-fifa-gold mx-auto mb-3" />
        <h2 className="text-xl font-bold text-white mb-2">Credits</h2>
        <p className="text-sm text-gray-400 max-w-lg mx-auto">
          Built with passion for football and web development.
          This is a fan-made project for educational and demonstration purposes.
          All team names and FIFA branding are property of their respective owners.
        </p>
        <p className="text-xs text-gray-500 mt-4">
          Flag images courtesy of flagcdn.com • Match schedule data from official FIFA sources
        </p>
      </motion.div>
    </div>
  );
}
