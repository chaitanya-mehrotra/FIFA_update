import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, ChevronRight, CheckCircle, XCircle, Clock3 } from 'lucide-react';
import { useTeams } from '../../hooks/useTeams';
import { usePredictions } from '../../context/PredictionsContext';
import type { Match } from '../../types';
import { formatDate } from '../../utils';

function TeamFlag({ teamId, size = 'md' }: { teamId: string | null; size?: 'sm' | 'md' | 'lg' }) {
  const { data: teams } = useTeams();
  const team = teams ? teams.find(t => t.id === teamId) : null;
  const sizeMap = { sm: 'w-6 h-4', md: 'w-8 h-6', lg: 'w-12 h-8' };
  
  if (!team) {
    return <div className={`${sizeMap[size]} rounded bg-white/10 flex items-center justify-center text-[10px] text-gray-500`}>TBD</div>;
  }
  return (
    <img
      src={`https://flagcdn.com/w80/${team.flag}.png`}
      alt={team.name}
      className={`${sizeMap[size]} rounded object-cover shadow-sm`}
      loading="lazy"
    />
  );
}

interface MatchCardProps {
  match: Match;
  compact?: boolean;
}

export default function MatchCard({ match, compact = false }: MatchCardProps) {
  const { data: teams } = useTeams();
  const { predictions } = usePredictions();
  const homeTeam = teams ? teams.find(t => t.id === match.homeTeamId) : null;
  const awayTeam = teams ? teams.find(t => t.id === match.awayTeamId) : null;

  const prediction = predictions[match.id];

  const stageLabels: Record<string, string> = {
    group: match.group ? `Group ${match.group}` : 'Group Stage',
    round_of_32: 'Round of 32',
    round_of_16: 'Round of 16',
    quarter_final: 'Quarter Final',
    semi_final: 'Semi Final',
    third_place: '3rd Place',
    final: 'Final',
  };

  const statusColors: Record<string, string> = {
    upcoming: 'bg-blue-500/20 text-blue-400',
    live: 'bg-red-500/20 text-red-400',
    finished: 'bg-gray-500/20 text-gray-400',
  };

  let cardStyle = "glass-card p-4 cursor-pointer group transition-all relative overflow-hidden";
  
  if (prediction) {
    if (prediction.status === 'CORRECT') cardStyle += " ring-1 ring-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.15)]";
    else if (prediction.status === 'WRONG') cardStyle += " ring-1 ring-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.15)]";
    else cardStyle += " ring-1 ring-yellow-500/30";
  }

  return (
    <Link to={`/match/${match.id}`} className="block outline-none">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={cardStyle}
      >
        {/* Prediction Status Badge */}
        {prediction && (
          <div className="absolute top-0 right-0 p-2">
            {prediction.status === 'CORRECT' && <CheckCircle className="w-5 h-5 text-green-400 bg-green-500/20 rounded-full" />}
            {prediction.status === 'WRONG' && <XCircle className="w-5 h-5 text-red-400 bg-red-500/20 rounded-full" />}
            {prediction.status === 'PENDING' && <Clock3 className="w-4 h-4 text-yellow-400 bg-yellow-500/20 rounded-full" />}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-3 pr-8">
          <span className="text-[11px] font-semibold text-fifa-gold uppercase tracking-wider">
            {stageLabels[match.stage]}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${statusColors[match.status]}`}>
            {match.status === 'live' 
              ? `● LIVE ${match.matchMinute || ''}` 
              : match.status === 'finished' 
                ? '✅ FT' 
                : '⏳ Upcoming'}
          </span>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between gap-2">
          {/* Home */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <TeamFlag teamId={match.homeTeamId} size={compact ? 'sm' : 'md'} />
            <span className="text-sm font-semibold text-white truncate">
              {homeTeam?.name || match.homeTeamPlaceholder || 'TBD'}
            </span>
          </div>

          {/* Score / Time */}
          <div className="flex flex-col items-center px-3 shrink-0">
            {match.status === 'finished' || match.status === 'live' ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">{match.homeScore ?? '-'}</span>
                <span className="text-sm text-gray-400">-</span>
                <span className="text-xl font-bold text-white">{match.awayScore ?? '-'}</span>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-sm font-bold text-fifa-gold">{match.istTime || match.time} <span className="text-[10px] text-gray-500 font-normal">IST</span></div>
                <div className="text-[10px] text-gray-400">{formatDate(match.date)}</div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
            <span className="text-sm font-semibold text-white truncate text-right">
              {awayTeam?.name || match.awayTeamPlaceholder || 'TBD'}
            </span>
            <TeamFlag teamId={match.awayTeamId} size={compact ? 'sm' : 'md'} />
          </div>
        </div>

        {/* Footer Info & Actions */}
        <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/5">
          {/* Action Button */}
          {match.status === 'upcoming' ? (
            <div className="text-center bg-white/5 hover:bg-white/10 rounded py-1.5 transition-colors border border-white/5">
              <span className="text-[11px] font-bold text-fifa-gold uppercase tracking-wider">
                {prediction ? 'Edit Prediction' : 'Predict Match'}
              </span>
            </div>
          ) : (
            <div className="text-center bg-white/5 hover:bg-white/10 rounded py-1.5 transition-colors border border-white/5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                View Result
              </span>
            </div>
          )}

          {!compact && (
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1 truncate max-w-[70%]">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{match.venue}{match.hostCity ? `, ${match.hostCity}` : ''}</span>
              </span>
              {match.localTime && (
                 <span className="flex items-center gap-1 shrink-0">
                   <Clock className="w-3 h-3" /> {match.localTime}
                 </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

export { TeamFlag };
