import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, SlidersHorizontal, Trophy, Target } from 'lucide-react';
import { useTeams } from '../hooks/useTeams';
import { useFixtures } from '../hooks/useFixtures';

const confederations = ['All', 'UEFA', 'CONMEBOL', 'CONCACAF', 'AFC', 'CAF', 'OFC'];

export default function Teams() {
  const { data: teams, isLoading: teamsLoading } = useTeams();
  const { data: fixtures, isLoading: fixturesLoading } = useFixtures();
  const [search, setSearch] = useState('');
  const [confFilter, setConfFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'ranking' | 'name' | 'finish'>('finish');

  const isLoading = teamsLoading || fixturesLoading;

  const teamTournamentFinishes = useMemo(() => {
    const finishes: Record<string, { label: string; color: string; rankScore: number }> = {};
    if (!fixtures) return finishes;

    // Final & 3rd place
    const finalMatch = fixtures.find(m => m.stage === 'final');
    if (finalMatch && finalMatch.winnerTeamId) {
      finishes[finalMatch.winnerTeamId] = {
        label: '🏆 World Champions',
        color: 'text-fifa-gold bg-fifa-gold/15 border-fifa-gold/40',
        rankScore: 1,
      };
      const loserId = finalMatch.winnerTeamId === finalMatch.homeTeamId ? finalMatch.awayTeamId : finalMatch.homeTeamId;
      if (loserId) {
        finishes[loserId] = {
          label: '🥈 Runners-Up',
          color: 'text-gray-200 bg-white/15 border-white/30',
          rankScore: 2,
        };
      }
    }

    const thirdMatch = fixtures.find(m => m.stage === 'third_place');
    if (thirdMatch && thirdMatch.winnerTeamId) {
      finishes[thirdMatch.winnerTeamId] = {
        label: '🥉 3rd Place',
        color: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
        rankScore: 3,
      };
      const loserId = thirdMatch.winnerTeamId === thirdMatch.homeTeamId ? thirdMatch.awayTeamId : thirdMatch.homeTeamId;
      if (loserId) {
        finishes[loserId] = {
          label: '4th Place',
          color: 'text-purple-300 bg-purple-500/15 border-purple-500/30',
          rankScore: 4,
        };
      }
    }

    // Quarter-finals losers
    fixtures.filter(m => m.stage === 'quarter_final').forEach(m => {
      const loserId = m.winnerTeamId === m.homeTeamId ? m.awayTeamId : m.homeTeamId;
      if (loserId && !finishes[loserId]) {
        finishes[loserId] = {
          label: 'Quarter-Finalist',
          color: 'text-blue-400 bg-blue-500/15 border-blue-500/30',
          rankScore: 5,
        };
      }
    });

    // Round of 16 losers
    fixtures.filter(m => m.stage === 'round_of_16').forEach(m => {
      const loserId = m.winnerTeamId === m.homeTeamId ? m.awayTeamId : m.homeTeamId;
      if (loserId && !finishes[loserId]) {
        finishes[loserId] = {
          label: 'Round of 16',
          color: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
          rankScore: 6,
        };
      }
    });

    // Round of 32 losers
    fixtures.filter(m => m.stage === 'round_of_32').forEach(m => {
      const loserId = m.winnerTeamId === m.homeTeamId ? m.awayTeamId : m.homeTeamId;
      if (loserId && !finishes[loserId]) {
        finishes[loserId] = {
          label: 'Round of 32',
          color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
          rankScore: 7,
        };
      }
    });

    // Remaining: Group Stage
    teams?.forEach(t => {
      if (!finishes[t.id]) {
        finishes[t.id] = {
          label: 'Group Stage',
          color: 'text-gray-400 bg-white/5 border-white/10',
          rankScore: 8,
        };
      }
    });

    return finishes;
  }, [fixtures, teams]);

  const filteredTeams = useMemo(() => {
    if (!teams) return [];
    let result = [...teams];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q) ||
        (t.coach && t.coach.toLowerCase().includes(q))
      );
    }

    if (confFilter !== 'All') {
      result = result.filter(t => t.confederation === confFilter);
    }

    result.sort((a, b) => {
      if (sortBy === 'finish') {
        const rankA = teamTournamentFinishes[a.id]?.rankScore ?? 99;
        const rankB = teamTournamentFinishes[b.id]?.rankScore ?? 99;
        if (rankA !== rankB) return rankA - rankB;
        return (a.ranking || 999) - (b.ranking || 999);
      }
      if (sortBy === 'ranking') return (a.ranking || 999) - (b.ranking || 999);
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [teams, search, confFilter, sortBy, teamTournamentFinishes]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Users className="w-8 h-8 text-fifa-gold" />
          Teams Archive
        </h1>
        <p className="text-gray-400 mt-1">48 participating nations and their official final tournament finish</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <div className="w-10 h-10 border-4 border-fifa-gold border-t-transparent rounded-full animate-spin mb-4" />
          <p>Loading teams...</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="glass-card p-4">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teams, coaches..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fifa-gold/50 transition-colors"
                />
              </div>

              <select
                value={confFilter}
                onChange={(e) => setConfFilter(e.target.value)}
                className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-fifa-gold/50 transition-colors appearance-none cursor-pointer"
              >
                {confederations.map(c => (
                  <option key={c} value={c} className="bg-fifa-navy text-white">{c}</option>
                ))}
              </select>

              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1 text-xs">
                <button
                  onClick={() => setSortBy('finish')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    sortBy === 'finish' ? 'bg-fifa-gold text-fifa-navy font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Tournament Finish
                </button>
                <button
                  onClick={() => setSortBy('ranking')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    sortBy === 'ranking' ? 'bg-fifa-gold text-fifa-navy font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  FIFA Rank
                </button>
                <button
                  onClick={() => setSortBy('name')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    sortBy === 'name' ? 'bg-fifa-gold text-fifa-navy font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Name
                </button>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              Showing {filteredTeams.length} of {teams?.length || 0} teams
            </div>
          </div>

          {/* Teams Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.02 } } }}
          >
            {filteredTeams.map((team) => {
              const finish = teamTournamentFinishes[team.id] || {
                label: 'Group Stage',
                color: 'text-gray-400 bg-white/5 border-white/10',
                rankScore: 8,
              };

              return (
                <motion.div
                  key={team.id}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.02 }}
                  className={`glass-card p-5 relative transition-all ${
                    finish.rankScore === 1 ? 'border-fifa-gold/60 shadow-lg shadow-fifa-gold/15 bg-fifa-gold/[0.03]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://flagcdn.com/w80/${team.flag}.png`}
                        alt={team.name}
                        className="w-12 h-8 rounded object-cover shadow-md"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-white">{team.name}</h3>
                        <span className="text-[11px] text-gray-400">{team.confederation || ''} • Group {team.group || ''}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${finish.color}`}>
                      {finish.label}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">FIFA Ranking</span>
                      <span className="font-bold text-fifa-gold">#{team.ranking || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Head Coach</span>
                      <span className="font-semibold text-white">{team.coach || 'TBD'}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </>
      )}
    </div>
  );
}
