import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, SlidersHorizontal, CheckCircle2, Trophy, Medal, Clock, XCircle, Target } from 'lucide-react';
import { useTeams } from '../hooks/useTeams';
import { useStandings } from '../hooks/useStandings';
import { calculateQualification } from '../utils/qualification';

const confederations = ['All', 'UEFA', 'CONMEBOL', 'CONCACAF', 'AFC', 'CAF', 'OFC'];

export default function Teams() {
  const { data: teams, isLoading: teamsLoading } = useTeams();
  const { data: standings } = useStandings();
  const [search, setSearch] = useState('');
  const [confFilter, setConfFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'ranking'>('ranking');

  const isLoading = teamsLoading;

  const qual = useMemo(() => {
    if (!standings) return null;
    return calculateQualification(standings);
  }, [standings]);

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
      if (sortBy === 'ranking') return (a.ranking || 999) - (b.ranking || 999);
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [teams, search, confFilter, sortBy]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Users className="w-8 h-8 text-fifa-gold" />
          Teams
        </h1>
        <p className="text-gray-400 mt-1">48 nations competing for the FIFA World Cup 2026™</p>
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

              <button
                onClick={() => setSortBy(prev => prev === 'ranking' ? 'name' : 'ranking')}
                className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Sort by {sortBy === 'ranking' ? 'Ranking' : 'Name'}
              </button>
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
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
          >
            {filteredTeams.map((team) => {
                let badge = null;
                const status = qual?.teamStatus[team.id] || 'TBD';
                
                if (status === 'WINNER') {
                   badge = <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20"><Trophy className="w-3 h-3" /> Confirmed Group Winner</span>;
                } else if (status === 'RUNNER_UP') {
                   badge = <span className="flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20"><Medal className="w-3 h-3" /> Confirmed Runner-Up</span>;
                } else if (status === 'QUALIFIED') {
                   // This covers teams that are guaranteed Top 2 but seed is unknown, OR confirmed best 3rd place
                   badge = <span className="flex items-center gap-1 text-[10px] font-bold text-fifa-gold bg-fifa-gold/10 px-2 py-1 rounded border border-fifa-gold/20"><CheckCircle2 className="w-3 h-3" /> Qualified</span>;
                } else if (status === 'ELIMINATED') {
                   badge = <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20"><XCircle className="w-3 h-3" /> Eliminated</span>;
                } else {
                   // TBD
                   badge = <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-500/10 px-2 py-1 rounded border border-gray-500/20"><Clock className="w-3 h-3" /> Qualification Pending</span>;
                }

                return (
                  <motion.div
                    key={team.id}
                    variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.02 }}
                    className={`glass-card p-5 cursor-pointer relative ${status === 'ELIMINATED' ? 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all' : ''}`}
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
                      {badge}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">FIFA Ranking</span>
                        <span className="font-bold text-fifa-gold">#{team.ranking || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Coach</span>
                        <span className="font-semibold text-white">{team.coach || 'TBD'}</span>
                      </div>
                      
                      {/* Community Picks Stat */}
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-gray-400 flex items-center gap-1"><Target className="w-3 h-3" /> Community Picks</span>
                          <span className="font-bold text-fifa-gold">
                            {/* Mock realistic community percentage based on ranking */}
                            {team.ranking ? Math.max(10, Math.min(85, Math.floor(100 - (team.ranking * 1.5)))) : 25}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-fifa-gold rounded-full" 
                            style={{ width: `${team.ranking ? Math.max(10, Math.min(85, Math.floor(100 - (team.ranking * 1.5)))) : 25}%` }} 
                          />
                        </div>
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
