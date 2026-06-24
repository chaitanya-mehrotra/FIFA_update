import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import type { Match, Team } from '../../types';

interface ChampionHighlightProps {
  finalMatch: Match;
  teams: Team[];
}

export function ChampionHighlight({ finalMatch, teams }: ChampionHighlightProps) {
  if (finalMatch.status !== 'finished') return null;

  const homeScore = finalMatch.homeScore ?? 0;
  const awayScore = finalMatch.awayScore ?? 0;
  
  if (homeScore === awayScore) {
    // If it's a draw and no penalties data, we don't know the winner definitively yet
    return null;
  }

  const winnerId = homeScore > awayScore ? finalMatch.homeTeamId : finalMatch.awayTeamId;
  const champion = teams.find(t => t.id === winnerId);

  if (!champion) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      className="mt-16 mb-8 text-center relative max-w-2xl mx-auto"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-fifa-gold/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative glass-card p-10 border-fifa-gold/50 bg-gradient-to-t from-fifa-navy to-fifa-navy-light shadow-[0_0_50px_rgba(212,175,55,0.2)]">
        
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center mb-6"
        >
          <Trophy className="w-24 h-24 text-fifa-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
        </motion.div>

        <h2 className="text-xl md:text-2xl font-bold text-gray-300 uppercase tracking-[0.3em] mb-6">
          World Cup Champion 2026
        </h2>

        <div className="flex flex-col items-center gap-6">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
            src={`https://flagcdn.com/w320/${champion.flag}.png`}
            alt={champion.name}
            className="w-48 h-32 md:w-64 md:h-40 object-cover rounded-xl shadow-2xl border-2 border-fifa-gold/50"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fifa-gold via-yellow-200 to-fifa-gold drop-shadow-lg"
          >
            {champion.name}
          </motion.h1>
        </div>
      </div>
    </motion.div>
  );
}
