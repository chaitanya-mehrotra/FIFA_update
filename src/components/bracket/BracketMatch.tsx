import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Calendar, MapPin, Info } from 'lucide-react';
import type { Match, Team } from '../../types';
import type { QualificationResult } from '../../utils/qualification';

interface BracketMatchProps {
  match: Match;
  teams: Team[];
  isFinal?: boolean;
  qual?: QualificationResult | null;
}

export function BracketMatch({ match, teams, isFinal = false, qual }: BracketMatchProps) {
  const home = teams.find(t => t.id === match.homeTeamId);
  const away = teams.find(t => t.id === match.awayTeamId);

  const homeScore = match.homeScore ?? 0;
  const awayScore = match.awayScore ?? 0;
  const isFinished = match.status === 'finished';

  const homeWon = isFinished && homeScore > awayScore;
  const awayWon = isFinished && awayScore > homeScore;

  const hasHome = !!home;
  const hasAway = !!away;
  const hasAnyTeam = hasHome || hasAway;

  // Card glow: gold border if confirmed teams, red for live, neutral for all-TBD
  const cardGlow = match.status === 'live' 
    ? 'shadow-[0_0_15px_rgba(239,68,68,0.2)] border-red-500/30' 
    : isFinal 
      ? 'shadow-[0_0_20px_rgba(212,175,55,0.15)] border-fifa-gold/30'
      : hasAnyTeam
        ? 'border-fifa-gold/20 shadow-[0_0_10px_rgba(212,175,55,0.08)]'
        : 'border-white/10 hover:border-white/20';

  const formatShortDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const getBadge = (teamId: string | undefined): { icon: string; label: string; color: string } | null => {
    if (!teamId || !qual) return null;
    const status = qual.teamStatus[teamId];
    if (status === 'WINNER') return { icon: '⭐', label: 'Group Winner', color: 'text-yellow-400 bg-yellow-500/15' };
    if (status === 'RUNNER_UP') return { icon: '🥈', label: 'Runner-Up', color: 'text-blue-300 bg-blue-500/15' };
    if (status === 'QUALIFIED') return { icon: '🔒', label: 'Qualified', color: 'text-green-400 bg-green-500/15' };
    return null;
  };

  const homeBadge = getBadge(home?.id);
  const awayBadge = getBadge(away?.id);

  const renderTeamRow = (
    team: Team | undefined,
    placeholder: string | undefined,
    won: boolean,
    lost: boolean,
    score: number | null | undefined,
    badge: ReturnType<typeof getBadge>,
    groupName: string
  ) => {
    const isConfirmed = !!team;
    return (
      <div className={`flex items-center justify-between p-2.5 rounded-lg transition-all duration-200 ${
        won ? 'bg-fifa-gold/10 ring-1 ring-fifa-gold/30' : 
        lost ? 'opacity-40' : 
        isConfirmed ? 'bg-white/[0.03]' : 'bg-transparent'
      } relative`}>
        <div className="flex items-center gap-3 min-w-0">
          {isConfirmed ? (
            <img 
              src={`https://flagcdn.com/w40/${team!.flag}.png`} 
              alt={team!.name} 
              className="w-7 h-5 rounded-sm object-cover shadow-sm ring-1 ring-white/10" 
            />
          ) : (
            <div className="w-7 h-5 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-[8px] text-gray-600">?</span>
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-semibold truncate ${
                isFinal ? 'max-w-[130px]' : 'max-w-[100px]'
              } ${
                won ? 'text-fifa-gold' : isConfirmed ? 'text-white' : 'text-gray-500 italic'
              }`}>
                {isConfirmed ? team!.name : 'TBD'}
              </span>
            </div>
            {!isConfirmed && placeholder && (
              <span className="text-[9px] text-gray-600 truncate max-w-[100px]">{placeholder}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {won && <Trophy className="w-3.5 h-3.5 text-fifa-gold" />}
          <span className={`text-sm font-bold w-5 text-center ${won ? 'text-fifa-gold' : 'text-white/70'}`}>
            {match.status === 'upcoming' ? '-' : (score ?? '-')}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Link to={`/match/${match.id}`} className="block relative group outline-none">
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className={`bg-[#121A2F]/90 backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-300 relative ${
          isFinal ? 'w-72 sm:w-80' : 'w-64'
        } ${cardGlow}`}
      >
        {/* Header */}
        <div className="bg-black/20 px-3 py-2 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              isFinal ? 'text-fifa-gold' : 'text-gray-400'
            }`}>
              Match {match.id}
            </span>
            {match.status === 'live' && (
              <span className="flex items-center gap-1 text-[9px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE {match.matchMinute || ''}
              </span>
            )}
            {match.status === 'finished' && (
              <span className="text-[9px] font-bold text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
                FT
              </span>
            )}
            {match.status === 'upcoming' && (
              <span className="text-[9px] font-medium text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">
                ⏳
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatShortDate(match.date)}</span>
          </div>
        </div>

        {/* Teams */}
        <div className="p-2 space-y-1">
          {renderTeamRow(home, match.homeTeamPlaceholder, homeWon, isFinished && !homeWon, match.homeScore, homeBadge, 'home')}
          {renderTeamRow(away, match.awayTeamPlaceholder, awayWon, isFinished && !awayWon, match.awayScore, awayBadge, 'away')}
        </div>

        {/* Hover overlay with venue info */}
        <div className="absolute inset-0 bg-fifa-navy/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
          <MapPin className="w-6 h-6 text-fifa-gold mb-2 opacity-80" />
          <span className="text-sm font-bold text-white mb-1">{match.venue}</span>
          {match.hostCity && <span className="text-xs text-gray-400">{match.hostCity}, {match.hostCountry}</span>}
          <span className="mt-3 text-[10px] uppercase tracking-widest text-fifa-gold font-bold">View Match Details</span>
        </div>
      </motion.div>
    </Link>
  );
}
