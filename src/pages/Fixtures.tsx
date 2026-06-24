import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, SlidersHorizontal } from 'lucide-react';
import { useFixtures } from '../hooks/useFixtures';
import { useTeams } from '../hooks/useTeams';
import MatchCard from '../components/match/MatchCard';
import type { MatchStatus, MatchStage } from '../types';

const stageOptions: { value: MatchStage | 'all'; label: string }[] = [
  { value: 'all', label: 'All Stages' },
  { value: 'group', label: 'Group Stage' },
  { value: 'round_of_32', label: 'Round of 32' },
  { value: 'round_of_16', label: 'Round of 16' },
  { value: 'quarter_final', label: 'Quarter Final' },
  { value: 'semi_final', label: 'Semi Final' },
  { value: 'third_place', label: '3rd Place' },
  { value: 'final', label: 'Final' },
];

const statusOptions: { value: MatchStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'live', label: 'Live' },
  { value: 'finished', label: 'Finished' },
];

export default function Fixtures() {
  const { data: fixtures, isLoading } = useFixtures();
  const { data: teams } = useTeams();

  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<MatchStage | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<MatchStatus | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(1);

  const filteredFixtures = useMemo(() => {
    if (!fixtures) return [];
    let result = [...fixtures];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(m => {
        const home = teams?.find(t => t.id === m.homeTeamId) || null;
        const away = teams?.find(t => t.id === m.awayTeamId) || null;
        return (
          (home?.name.toLowerCase().includes(q)) ||
          (away?.name.toLowerCase().includes(q)) ||
          m.venue.toLowerCase().includes(q) ||
          (m.homeTeamPlaceholder?.toLowerCase().includes(q)) ||
          (m.awayTeamPlaceholder?.toLowerCase().includes(q))
        );
      });
    }

    // Stage filter
    if (stageFilter !== 'all') {
      result = result.filter(m => m.stage === stageFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(m => m.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [fixtures, teams, search, stageFilter, statusFilter, sortOrder]);

  const totalPages = Math.ceil(filteredFixtures.length / ITEMS_PER_PAGE);
  const paginatedFixtures = filteredFixtures.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-10 h-10 border-4 border-fifa-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading fixtures...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white">Fixtures</h1>
        <p className="text-gray-400 mt-1">Browse all 104 matches of the FIFA World Cup 2026</p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams, venues..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fifa-gold/50 transition-colors"
            />
          </div>

          {/* Stage */}
          <select
            value={stageFilter}
            onChange={(e) => { setStageFilter(e.target.value as MatchStage | 'all'); setPage(1); }}
            className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-fifa-gold/50 transition-colors appearance-none cursor-pointer"
          >
            {stageOptions.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-fifa-navy text-white">{opt.label}</option>
            ))}
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as MatchStatus | 'all'); setPage(1); }}
            className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-fifa-gold/50 transition-colors appearance-none cursor-pointer"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-fifa-navy text-white">{opt.label}</option>
            ))}
          </select>

          {/* Sort */}
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {sortOrder === 'asc' ? 'Earliest First' : 'Latest First'}
          </button>
        </div>
        <div className="mt-3 text-xs text-gray-400">
          Showing {paginatedFixtures.length} of {filteredFixtures.length} matches
        </div>
      </div>

      {/* Matches Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {paginatedFixtures.map((match) => (
          <motion.div
            key={match.id}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          >
            <MatchCard match={match} />
          </motion.div>
        ))}
      </motion.div>

      {paginatedFixtures.length === 0 && (
        <div className="text-center py-16">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No matches found for the current filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let p: number;
            if (totalPages <= 7) {
              p = i + 1;
            } else if (page <= 4) {
              p = i + 1;
            } else if (page >= totalPages - 3) {
              p = totalPages - 6 + i;
            } else {
              p = page - 3 + i;
            }
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  page === p
                    ? 'bg-fifa-gold text-fifa-navy'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {p}
              </button>
            );
          })}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
