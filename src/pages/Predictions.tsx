import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Trash2, CheckCircle, XCircle, Clock3 } from 'lucide-react';
import { useFixtures } from '../hooks/useFixtures';
import { useTeams } from '../hooks/useTeams';
import { usePredictions } from '../context/PredictionsContext';
import { Link } from 'react-router-dom';

export default function Predictions() {
  const { data: fixtures, isLoading: isLoadingFixtures } = useFixtures();
  const { data: teams, isLoading: isLoadingTeams } = useTeams();
  const { predictions, clearPredictions } = usePredictions();
  
  if (isLoadingFixtures || isLoadingTeams) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-10 h-10 border-4 border-fifa-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading predictions data...</p>
      </div>
    );
  }

  const predictionsList = Object.values(predictions).sort((a, b) => b.timestamp - a.timestamp);
  const totalPredictions = predictionsList.length;
  
  const correctCount = predictionsList.filter(p => p.status === 'CORRECT').length;
  const wrongCount = predictionsList.filter(p => p.status === 'WRONG').length;
  const pendingCount = predictionsList.filter(p => p.status === 'PENDING').length;
  
  const evaluatedCount = correctCount + wrongCount;
  const accuracy = evaluatedCount > 0 ? Math.round((correctCount / evaluatedCount) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Target className="w-8 h-8 text-fifa-gold" />
            My Predictions
          </h1>
          <p className="text-gray-400 mt-1">Track your prediction accuracy across all matches</p>
        </div>
        <div className="flex items-center gap-3">
          {totalPredictions > 0 && (
            <button
              onClick={clearPredictions}
              className="px-3 py-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Clear History
            </button>
          )}
        </div>
      </div>

      {/* Leaderboard / Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 md:col-span-2 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
            <Target className="w-48 h-48 -mr-12 -mt-12 text-fifa-gold" />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              🎯 Prediction Accuracy
            </h3>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-5xl font-black text-fifa-gold">{accuracy}%</span>
              <span className="text-gray-400 mb-1">accuracy</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-3 bg-white/5 rounded-full overflow-hidden flex">
              {evaluatedCount > 0 ? (
                <>
                  <div style={{ width: `${(correctCount / evaluatedCount) * 100}%` }} className="bg-green-500" />
                  <div style={{ width: `${(wrongCount / evaluatedCount) * 100}%` }} className="bg-red-500" />
                </>
              ) : (
                <div className="w-full bg-white/10" />
              )}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>{correctCount} Correct</span>
              <span>{wrongCount} Wrong</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 flex flex-col justify-center items-center text-center"
        >
          <span className="text-4xl font-bold text-white mb-1">{totalPredictions}</span>
          <span className="text-sm text-gray-400">Total Predictions</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 flex flex-col justify-center items-center text-center"
        >
          <Clock3 className="w-8 h-8 text-yellow-400 mb-2 opacity-80" />
          <span className="text-2xl font-bold text-white mb-1">{pendingCount}</span>
          <span className="text-sm text-gray-400">Pending Results</span>
        </motion.div>
      </div>

      {/* History List */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Prediction History</h2>
        {predictionsList.length === 0 ? (
          <div className="glass-card p-12 text-center text-gray-400">
            <Target className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p>You haven't made any predictions yet.</p>
            <p className="mt-2 text-sm">Go to any upcoming match to make your first prediction!</p>
            <Link to="/fixtures" className="inline-block mt-4 px-6 py-2 bg-fifa-gold text-fifa-navy font-bold rounded-lg hover:bg-fifa-gold-hover transition-colors">
              Browse Fixtures
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {predictionsList.map(pred => {
              const match = fixtures?.find(m => m.id === pred.matchId);
              if (!match) return null;

              const homeTeam = teams?.find(t => t.id === match.homeTeamId);
              const awayTeam = teams?.find(t => t.id === match.awayTeamId);

              const isCorrect = pred.status === 'CORRECT';
              const isWrong = pred.status === 'WRONG';
              const isPending = pred.status === 'PENDING';

              const getChoiceLabel = () => {
                if (pred.choice === 'HOME') return homeTeam?.name || match.homeTeamPlaceholder || 'Home Team';
                if (pred.choice === 'AWAY') return awayTeam?.name || match.awayTeamPlaceholder || 'Away Team';
                return 'Draw';
              };

              return (
                <Link to={`/match/${match.id}`} key={match.id} className="block outline-none">
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className={`glass-card p-4 transition-all border-l-4 ${
                      isCorrect ? 'border-l-green-500 bg-green-500/5' : 
                      isWrong ? 'border-l-red-500 bg-red-500/5' : 
                      'border-l-yellow-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Match {match.id}</span>
                      
                      {isCorrect && <span className="flex items-center gap-1 text-xs font-bold text-green-400"><CheckCircle className="w-3.5 h-3.5" /> Correct</span>}
                      {isWrong && <span className="flex items-center gap-1 text-xs font-bold text-red-400"><XCircle className="w-3.5 h-3.5" /> Wrong</span>}
                      {isPending && <span className="flex items-center gap-1 text-xs font-bold text-yellow-400"><Clock3 className="w-3.5 h-3.5" /> Pending</span>}
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      {/* Home Team */}
                      <div className="flex-1 flex items-center gap-2">
                        {homeTeam ? (
                           <img src={`https://flagcdn.com/w40/${homeTeam.flag}.png`} alt={homeTeam.name} className="w-6 h-4 rounded object-cover shadow-sm" />
                        ) : (
                           <div className="w-6 h-4 rounded bg-white/10 text-[8px] flex items-center justify-center">?</div>
                        )}
                        <span className="text-sm font-semibold text-white truncate">
                          {homeTeam?.name || match.homeTeamPlaceholder || 'TBD'}
                        </span>
                      </div>

                      {/* Actual Score */}
                      <div className="shrink-0 text-center px-4">
                        {(match.status === 'finished' || match.status === 'live') ? (
                          <div className="text-lg font-bold text-white bg-black/20 px-3 py-1 rounded">
                            {match.homeScore} - {match.awayScore}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-500">vs</div>
                        )}
                      </div>

                      {/* Away Team */}
                      <div className="flex-1 flex items-center justify-end gap-2 text-right">
                        <span className="text-sm font-semibold text-white truncate">
                          {awayTeam?.name || match.awayTeamPlaceholder || 'TBD'}
                        </span>
                        {awayTeam ? (
                           <img src={`https://flagcdn.com/w40/${awayTeam.flag}.png`} alt={awayTeam.name} className="w-6 h-4 rounded object-cover shadow-sm" />
                        ) : (
                           <div className="w-6 h-4 rounded bg-white/10 text-[8px] flex items-center justify-center">?</div>
                        )}
                      </div>
                    </div>

                    {/* Predicted Outcome */}
                    <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center text-sm">
                      <span className="text-gray-400">Your Prediction:</span>
                      <span className="font-bold text-white">{getChoiceLabel()}</span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
