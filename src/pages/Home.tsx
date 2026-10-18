import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, Target, ChevronRight, MapPin, Award, Star, Shield, Flame, CheckCircle2 } from 'lucide-react';
import { useLiveMatches } from '../hooks/useLiveMatches';
import { useTeams } from '../hooks/useTeams';
import MatchCard from '../components/match/MatchCard';
import { tournamentOverview } from '../data/tournamentArchive';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const { data: matchesData, isLoading } = useLiveMatches();
  const { data: teams } = useTeams();

  const finishedMatches = matchesData?.latest || [];
  // Grab the pinnacle matches: Final, 3rd place, Semi-finals, Quarter-finals
  const headlineMatches = finishedMatches.slice(0, 6);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-10 h-10 border-4 border-fifa-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading tournament archive...</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fifa-navy via-[#0d1b3e] to-[#1a0a2e]" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-fifa-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fifa-gold/15 border border-fifa-gold/40 text-fifa-gold text-xs font-semibold uppercase tracking-widest shadow-lg shadow-fifa-gold/10"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Official Post-Tournament Archive • June 11 – July 19, 2026
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-fifa-gold via-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-fifa-gold/30">
                  <Trophy className="w-10 h-10 text-fifa-navy" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight">
                FIFA World Cup
                <br />
                <span className="bg-gradient-to-r from-fifa-gold via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  2026™ Archive
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                United States • Mexico • Canada — The complete historical record of football's first 48-nation World Cup, crowned by Spain's historic second title.
              </p>
            </motion.div>

            {/* Champion Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto glass-card p-6 border-fifa-gold/40 bg-gradient-to-b from-fifa-gold/10 to-transparent shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-4 py-1 bg-fifa-gold text-fifa-navy text-xs font-extrabold uppercase tracking-widest rounded-bl-lg flex items-center gap-1">
                <Trophy className="w-3 h-3" /> World Champion
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left mt-2">
                <img
                  src={`https://flagcdn.com/w160/${tournamentOverview.champion.flag}.png`}
                  alt={tournamentOverview.champion.name}
                  className="w-24 h-16 rounded-lg object-cover shadow-lg border border-fifa-gold/30"
                />
                <div className="flex-1">
                  <div className="text-xs text-fifa-gold uppercase font-bold tracking-wider">2026 World Champion</div>
                  <h2 className="text-2xl font-black text-white">{tournamentOverview.champion.name}</h2>
                  <p className="text-sm text-gray-300 mt-1">
                    Final: <span className="font-semibold text-white">{tournamentOverview.champion.scoreline}</span>
                  </p>
                  <p className="text-xs text-fifa-gold/90 mt-0.5">
                    Winning Goal: {tournamentOverview.champion.winningGoal} • MetLife Stadium, New York/NJ
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
            >
              <Link
                to="/fixtures"
                className="px-6 py-3 bg-gradient-to-r from-fifa-gold to-yellow-600 text-fifa-navy font-bold rounded-xl hover:shadow-lg hover:shadow-fifa-gold/25 transition-all hover:scale-105 text-sm"
              >
                All 104 Match Results
              </Link>
              <Link
                to="/knockout"
                className="px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/15 transition-all text-sm"
              >
                Tournament Bracket
              </Link>
              <Link
                to="/groups"
                className="px-6 py-3 bg-white/5 border border-white/10 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-all text-sm"
              >
                Final Standings
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tournament Stats */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'Participating Teams', value: '48', icon: Users, color: 'text-blue-400' },
          { label: 'Matches Completed', value: '104 / 104', icon: Calendar, color: 'text-fifa-gold' },
          { label: 'Total Goals Scored', value: String(tournamentOverview.totalGoals), icon: Target, color: 'text-green-400' },
          { label: 'Goals Per Match', value: String(tournamentOverview.averageGoals), icon: Flame, color: 'text-purple-400' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="glass-card p-5 text-center"
          >
            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
            <div className="text-2xl lg:text-3xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* Tournament Podium (Top 4 Nations) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-fifa-gold" /> Tournament Podium
          </h2>
          <Link
            to="/knockout"
            className="text-sm text-fifa-gold hover:text-fifa-gold-hover flex items-center gap-1 transition-colors"
          >
            View Bracket <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1st Place */}
          <div className="glass-card p-5 border-fifa-gold/40 bg-gradient-to-b from-fifa-gold/15 to-transparent relative">
            <div className="absolute top-3 right-3 text-2xl">🥇</div>
            <span className="text-[11px] font-bold text-fifa-gold uppercase tracking-wider">Champions</span>
            <div className="flex items-center gap-3 mt-3">
              <img src="https://flagcdn.com/w80/es.png" alt="Spain" className="w-12 h-8 rounded object-cover shadow" />
              <div>
                <div className="font-bold text-white text-lg">Spain</div>
                <div className="text-xs text-gray-400">2nd Title (2010, 2026)</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-xs text-gray-300">
              Defeated Argentina 1–0 (AET)
            </div>
          </div>

          {/* 2nd Place */}
          <div className="glass-card p-5 border-gray-400/30 bg-gradient-to-b from-gray-400/10 to-transparent relative">
            <div className="absolute top-3 right-3 text-2xl">🥈</div>
            <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Runners-Up</span>
            <div className="flex items-center gap-3 mt-3">
              <img src="https://flagcdn.com/w80/ar.png" alt="Argentina" className="w-12 h-8 rounded object-cover shadow" />
              <div>
                <div className="font-bold text-white text-lg">Argentina</div>
                <div className="text-xs text-gray-400">2022 Champions</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-xs text-gray-300">
              Finalist (Silver Medal)
            </div>
          </div>

          {/* 3rd Place */}
          <div className="glass-card p-5 border-amber-700/30 bg-gradient-to-b from-amber-700/10 to-transparent relative">
            <div className="absolute top-3 right-3 text-2xl">🥉</div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Third Place</span>
            <div className="flex items-center gap-3 mt-3">
              <img src="https://flagcdn.com/w80/gb-eng.png" alt="England" className="w-12 h-8 rounded object-cover shadow" />
              <div>
                <div className="font-bold text-white text-lg">England</div>
                <div className="text-xs text-gray-400">Bronze Medalists</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-xs text-gray-300">
              Defeated France 6–4
            </div>
          </div>

          {/* 4th Place */}
          <div className="glass-card p-5 border-white/10 bg-white/[0.02] relative">
            <div className="absolute top-3 right-3 text-xs font-bold text-gray-500 uppercase">4th</div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Fourth Place</span>
            <div className="flex items-center gap-3 mt-3">
              <img src="https://flagcdn.com/w80/fr.png" alt="France" className="w-12 h-8 rounded object-cover shadow" />
              <div>
                <div className="font-bold text-white text-lg">France</div>
                <div className="text-xs text-gray-400">Semi-Finalists</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-xs text-gray-300">
              10 goals in tournament
            </div>
          </div>
        </div>
      </section>

      {/* Official FIFA Awards */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-fifa-gold" /> Official Tournament Awards
          </h2>
          <Link
            to="/statistics"
            className="text-sm text-fifa-gold hover:text-fifa-gold-hover flex items-center gap-1 transition-colors"
          >
            All Stats <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tournamentOverview.awards.map((award) => (
            <div key={award.title} className="glass-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-fifa-gold uppercase tracking-wider">{award.title}</span>
                  {award.teamId && (
                    <span className="text-xs text-gray-400 font-semibold">{award.teamName}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mt-2">{award.recipient}</h3>
                <div className="inline-block mt-2 px-2.5 py-1 rounded bg-white/5 text-xs font-semibold text-gray-300">
                  {award.metric}
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/5">
                {award.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pinnacle Matches Showcase */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-fifa-gold" /> Final & Decisive Knockout Clashes
          </h2>
          <Link
            to="/fixtures"
            className="text-sm text-fifa-gold hover:text-fifa-gold-hover flex items-center gap-1 transition-colors"
          >
            View All 104 Matches <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {headlineMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </div>
  );
}
