import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, Flag } from 'lucide-react';
import { useFixtures } from '../hooks/useFixtures';
import { useTeams } from '../hooks/useTeams';
import { formatDate } from '../utils';
import PredictionWidget from '../components/match/PredictionWidget';

export default function MatchDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: fixtures, isLoading } = useFixtures();
  const { data: teams } = useTeams();
  
  const match = fixtures?.find(m => m.id === Number(id));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-10 h-10 border-4 border-fifa-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading match details...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-white mb-2">Match Not Found</h1>
        <p className="text-gray-400 mb-4">The match you're looking for doesn't exist.</p>
        <Link to="/fixtures" className="text-fifa-gold hover:text-fifa-gold-hover transition-colors">
          ← Back to Fixtures
        </Link>
      </div>
    );
  }

  const home = teams ? teams.find(t => t.id === match.homeTeamId) : null;
  const away = teams ? teams.find(t => t.id === match.awayTeamId) : null;

  const stageLabels: Record<string, string> = {
    group: match.group ? `Group ${match.group}` : 'Group Stage',
    round_of_32: 'Round of 32',
    round_of_16: 'Round of 16',
    quarter_final: 'Quarter Final',
    semi_final: 'Semi Final',
    third_place: 'Third Place Match',
    final: 'Final',
  };


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Back */}
      <Link
        to="/fixtures"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-fifa-gold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Fixtures
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 lg:p-8 bg-gradient-to-br from-fifa-gold/5 to-transparent"
      >
        <div className="text-center mb-6">
          <span className="text-xs text-fifa-gold font-semibold uppercase tracking-widest">
            {stageLabels[match.stage]} • Match {match.id}
          </span>
        </div>

        <div className="flex items-center justify-center gap-6 lg:gap-12">
          {/* Home */}
          <div className="text-center space-y-2 flex-1">
            {home ? (
              <img
                src={`https://flagcdn.com/w160/${home.flag}.png`}
                alt={home.name}
                className="w-20 h-14 lg:w-28 lg:h-20 rounded-lg object-cover mx-auto shadow-lg"
              />
            ) : (
              <div className="w-20 h-14 lg:w-28 lg:h-20 rounded-lg bg-white/10 mx-auto flex items-center justify-center text-xs text-gray-500">TBD</div>
            )}
            <div className="text-lg font-bold text-white">{home?.name || match.homeTeamPlaceholder || 'TBD'}</div>
          </div>

          {/* Score */}
          <div className="text-center">
            {match.status === 'finished' || match.status === 'live' ? (
              <div className="flex items-center gap-3">
                <span className="text-4xl lg:text-5xl font-black text-white">{match.homeScore ?? 0}</span>
                <span className="text-xl text-gray-500">–</span>
                <span className="text-4xl lg:text-5xl font-black text-white">{match.awayScore ?? 0}</span>
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold text-fifa-gold">{match.istTime || match.time} <span className="text-sm font-normal text-gray-400">IST</span></div>
                <div className="text-sm text-gray-400 mt-1">{formatDate(match.date)}</div>
              </div>
            )}
            <div className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full inline-block ${
              match.status === 'live' ? 'bg-red-500/20 text-red-400' :
              match.status === 'finished' ? 'bg-gray-500/20 text-gray-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {match.status === 'live' 
                ? `● LIVE ${match.matchMinute || ''}` 
                : match.status === 'finished' 
                  ? '✅ Full Time' 
                  : '⏳ Upcoming'}
            </div>
          </div>

          {/* Away */}
          <div className="text-center space-y-2 flex-1">
            {away ? (
              <img
                src={`https://flagcdn.com/w160/${away.flag}.png`}
                alt={away.name}
                className="w-20 h-14 lg:w-28 lg:h-20 rounded-lg object-cover mx-auto shadow-lg"
              />
            ) : (
              <div className="w-20 h-14 lg:w-28 lg:h-20 rounded-lg bg-white/10 mx-auto flex items-center justify-center text-xs text-gray-500">TBD</div>
            )}
            <div className="text-lg font-bold text-white">{away?.name || match.awayTeamPlaceholder || 'TBD'}</div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col items-center gap-3 mt-6 text-sm text-gray-400 border-t border-white/5 pt-5">
          <div className="flex items-center justify-center gap-6">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> 
              {match.venue}{match.hostCity ? `, ${match.hostCity}, ${match.hostCountry}` : ''}
            </span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(match.date)}</span>
          </div>
          <div className="flex items-center justify-center gap-6">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {match.istTime || match.time} (IST)</span>
            {match.localTime && (
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {match.localTime} (Local)</span>
            )}
            {match.utcTime && (
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {match.utcTime} (UTC)</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Prediction Widget */}
      <PredictionWidget match={match} homeTeam={home ?? null} awayTeam={away ?? null} />

      {/* Goal Scorers */}
      {(match.status === 'live' || match.status === 'finished') ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
            ⚽ Goal Scorers
          </h2>
          
          <div className="grid grid-cols-2 gap-4 divide-x divide-white/10">
            {/* Home Scorers */}
            <div className="space-y-3 pr-4">
              {match.homeScorers && match.homeScorers.length > 0 ? (
                match.homeScorers.map((scorer, idx) => (
                  <div key={idx} className="flex items-center justify-end gap-3">
                    <div className="text-right">
                      <span className="text-sm font-medium text-white">{scorer.player}</span>
                      <span className="text-xs text-gray-400 ml-2">{scorer.minute}'</span>
                    </div>
                    <span className="text-xs">⚽</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 text-right italic">No goals</div>
              )}
            </div>

            {/* Away Scorers */}
            <div className="space-y-3 pl-4">
              {match.awayScorers && match.awayScorers.length > 0 ? (
                match.awayScorers.map((scorer, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-xs">⚽</span>
                    <div>
                      <span className="text-xs text-gray-400 mr-2">{scorer.minute}'</span>
                      <span className="text-sm font-medium text-white">{scorer.player}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic">No goals</div>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fifa-navy border border-white/5 mb-4 shadow-lg shadow-black/50">
            <Clock className="w-8 h-8 text-fifa-gold" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Match has not started yet</h2>
          <p className="text-gray-400">Goal scorers and live statistics will be available once the match begins.</p>
        </motion.div>
      )}
    </div>
  );
}
