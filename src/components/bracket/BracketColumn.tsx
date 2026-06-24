import { motion } from 'framer-motion';
import { BracketMatch } from './BracketMatch';
import type { Match, Team } from '../../types';
import type { QualificationResult } from '../../utils/qualification';

interface BracketColumnProps {
  title: string;
  matches: Match[];
  teams: Team[];
  hasNextColumn: boolean;
  isFinal?: boolean;
  qual?: QualificationResult | null;
}

export function BracketColumn({ title, matches, teams, hasNextColumn, isFinal, qual }: BracketColumnProps) {
  return (
    <div className="flex flex-col flex-1 min-w-[280px]">
      {/* Column Header */}
      <div className="text-center mb-8 sticky left-0 z-10">
        <div className="inline-block px-5 py-2 rounded-full bg-fifa-navy/80 backdrop-blur-sm border border-fifa-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
          <span className="text-xs font-black text-fifa-gold uppercase tracking-[0.2em]">{title}</span>
        </div>
      </div>

      {/* Matches Container */}
      <div className="flex flex-col flex-1 relative justify-around">
        {matches.map((match, idx) => (
          <div key={match.id} className="relative flex items-center justify-center py-4 w-full group">
            
            {/* The Match Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
              className="relative z-10"
            >
              <BracketMatch match={match} teams={teams} isFinal={isFinal} qual={qual} />
            </motion.div>

            {/* Connector Lines (only if there's a next column) */}
            {hasNextColumn && (
              <div className="absolute right-0 w-1/2 h-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity flex">
                 <div className="w-1/2 h-[2px] bg-white absolute right-0 top-1/2" />
                 {idx % 2 === 0 ? (
                   <div className="w-[2px] h-1/2 bg-white absolute right-0 top-1/2" />
                 ) : (
                   <div className="w-[2px] h-1/2 bg-white absolute right-0 bottom-1/2" />
                 )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
