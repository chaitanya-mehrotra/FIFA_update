import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, Target, ChevronRight, MapPin, Star, Zap, TrendingUp, Award } from 'lucide-react';
import { useLiveMatches } from '../hooks/useLiveMatches';
import { useTeams } from '../hooks/useTeams';
import MatchCard from '../components/match/MatchCard';

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

  const allMatches = [
    ...(matchesData?.live || []),
    ...(matchesData?.today || []),
    ...(matchesData?.upcoming || []),
    ...(matchesData?.latest || [])
  ];

  const displayMatches = matchesData?.live.length ? matchesData.live :
                         matchesData?.today.length ? matchesData.today :
                         matchesData?.upcoming.slice(0, 6) || [];

  const totalGoals = 132; // Aggregate still simulated for now until we compute overall
  const matchesPlayed = allMatches.filter(m => m.status === 'finished').length;
  const remainingMatches = allMatches.length > 0 ? 104 - matchesPlayed : 104;

  const featuredMatch = displayMatches[0] || null;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-10 h-10 border-4 border-fifa-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading live data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fifa-navy via-[#0d1b3e] to-[#1a0a2e]" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-fifa-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fifa-gold/10 border border-fifa-gold/30 text-fifa-gold text-xs font-semibold uppercase tracking-widest"
            >
              <Zap className="w-3 h-3" /> June 11 – July 19, 2026
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-fifa-gold via-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-fifa-gold/20">
                  <Trophy className="w-10 h-10 text-fifa-navy" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight">
                FIFA World Cup
                <br />
                <span className="bg-gradient-to-r from-fifa-gold via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  2026™
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                United States • Mexico • Canada — The biggest tournament in football history with 48 nations competing for glory.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link
                to="/fixtures"
                className="px-6 py-3 bg-gradient-to-r from-fifa-gold to-yellow-600 text-fifa-navy font-bold rounded-xl hover:shadow-lg hover:shadow-fifa-gold/25 transition-all hover:scale-105 text-sm"
              >
                View Fixtures
              </Link>
              <Link
                to="/predictions"
                className="px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all text-sm"
              >
                Make Predictions
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'Teams', value: '48', icon: Users, color: 'text-blue-400' },
          { label: 'Matches', value: '104', icon: Calendar, color: 'text-fifa-gold' },
          { label: 'Goals', value: String(totalGoals), icon: Target, color: 'text-green-400' },
          { label: 'Remaining', value: String(remainingMatches), icon: TrendingUp, color: 'text-purple-400' },
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

      {/* 🔴 Live Matches */}
      {matchesData?.live && matchesData.live.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" /> Live Now
            </h2>
            <Link
              to="/fixtures"
              className="text-sm text-fifa-gold hover:text-fifa-gold-hover flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchesData.live.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* ⏳ Upcoming Matches */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-fifa-gold" />
            {matchesData?.today && matchesData.today.length > 0 ? 'Matches Today' : 'Upcoming Matches'}
          </h2>
          <Link
            to="/fixtures"
            className="text-sm text-fifa-gold hover:text-fifa-gold-hover flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(matchesData?.today && matchesData.today.length > 0 
            ? matchesData.today 
            : matchesData?.upcoming?.slice(0, 6) || []
          ).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* ✅ Recent Results */}
      {matchesData?.latest && matchesData.latest.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" /> Recent Results
            </h2>
            <Link
              to="/fixtures"
              className="text-sm text-fifa-gold hover:text-fifa-gold-hover flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchesData.latest.slice(0, 6).map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Match */}
      {featuredMatch && (
        <section>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-fifa-gold" />
            Featured Match
          </h2>
          <Link to={`/match/${featuredMatch.id}`}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass-card p-6 lg:p-8 bg-gradient-to-br from-fifa-gold/5 to-transparent"
            >
              <div className="text-center">
                <span className="text-[11px] text-fifa-gold font-semibold uppercase tracking-widest">
                  {featuredMatch.stage === 'group' ? 'Group Stage' : 'Knockout Stage'}
                </span>
                <div className="flex items-center justify-center gap-8 lg:gap-16 mt-6">
                  {/* Home */}
                  <div className="text-center space-y-2">
                    <img
                      src={`https://flagcdn.com/w160/${teams?.find(t => t.id === featuredMatch.homeTeamId)?.flag || 'un'}.png`}
                      alt=""
                      className="w-20 h-14 lg:w-28 lg:h-20 rounded-lg object-cover mx-auto shadow-lg"
                    />
                    <div className="text-lg font-bold text-white">{teams?.find(t => t.id === featuredMatch.homeTeamId)?.name || featuredMatch.homeTeamPlaceholder}</div>
                  </div>

                  {/* VS */}
                  <div className="flex flex-col items-center">
                    {featuredMatch.status === 'live' || featuredMatch.status === 'finished' ? (
                       <div className="text-3xl lg:text-5xl font-black text-white">
                         {featuredMatch.homeScore} - {featuredMatch.awayScore}
                       </div>
                    ) : (
                      <>
                        <div className="text-3xl font-black text-fifa-gold">VS</div>
                        <div className="text-xs text-gray-400 mt-1">{featuredMatch.istTime || featuredMatch.time} IST</div>
                      </>
                    )}
                    <div className="text-xs text-gray-400 mt-1">{formatDateLong(featuredMatch.date)}</div>
                  </div>

                  {/* Away */}
                  <div className="text-center space-y-2">
                    <img
                      src={`https://flagcdn.com/w160/${teams?.find(t => t.id === featuredMatch.awayTeamId)?.flag || 'un'}.png`}
                      alt=""
                      className="w-20 h-14 lg:w-28 lg:h-20 rounded-lg object-cover mx-auto shadow-lg"
                    />
                    <div className="text-lg font-bold text-white">{teams?.find(t => t.id === featuredMatch.awayTeamId)?.name || featuredMatch.awayTeamPlaceholder}</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 mt-4 text-sm text-gray-400">
                  <MapPin className="w-3.5 h-3.5" /> {featuredMatch.venue}{featuredMatch.hostCity ? `, ${featuredMatch.hostCity}` : ''}
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}
    </div>
  );
}

function formatDateLong(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  } catch(e) {
    return dateStr;
  }
}
