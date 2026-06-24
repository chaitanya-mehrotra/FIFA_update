import { motion } from 'framer-motion';
import { Target, CheckCircle, XCircle, Lock } from 'lucide-react';
import { usePredictions, PredictionChoice } from '../../context/PredictionsContext';
import type { Match, Team } from '../../types';

interface PredictionWidgetProps {
  match: Match;
  homeTeam: Team | null;
  awayTeam: Team | null;
}

export default function PredictionWidget({ match, homeTeam, awayTeam }: PredictionWidgetProps) {
  const { predictions, setPrediction } = usePredictions();
  const prediction = predictions[match.id];

  const handlePredict = (choice: PredictionChoice) => {
    if (match.status !== 'upcoming') return;
    setPrediction(match.id, choice);
  };

  const getChoiceLabel = (choice: PredictionChoice) => {
    if (choice === 'HOME') return homeTeam?.name || match.homeTeamPlaceholder || 'Home Team';
    if (choice === 'AWAY') return awayTeam?.name || match.awayTeamPlaceholder || 'Away Team';
    return 'Draw';
  };

  // 1. LIVE MATCH STATE
  if (match.status === 'live') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 border-red-500/20 bg-red-500/5 text-center"
      >
        <Lock className="w-8 h-8 text-red-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-1">Predictions Closed</h3>
        <p className="text-sm text-gray-400">This match is currently live. New predictions cannot be made.</p>
        {prediction && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <span className="text-xs text-gray-400">Your prediction:</span>
            <span className="text-sm font-bold text-white">{getChoiceLabel(prediction.choice)}</span>
          </div>
        )}
      </motion.div>
    );
  }

  // 2. FINISHED MATCH STATE
  if (match.status === 'finished') {
    if (!prediction) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 text-center border-white/5"
        >
          <Target className="w-8 h-8 text-gray-500 mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-bold text-white mb-1">Match Finished</h3>
          <p className="text-sm text-gray-400">You did not make a prediction for this match.</p>
        </motion.div>
      );
    }

    const isCorrect = prediction.status === 'CORRECT';
    const bgColor = isCorrect ? 'bg-green-500/10' : 'bg-red-500/10';
    const borderColor = isCorrect ? 'border-green-500/30' : 'border-red-500/30';
    const textColor = isCorrect ? 'text-green-400' : 'text-red-400';
    const Icon = isCorrect ? CheckCircle : XCircle;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-card p-6 text-center ${bgColor} ${borderColor}`}
      >
        <Icon className={`w-10 h-10 mx-auto mb-3 ${textColor}`} />
        <h3 className={`text-xl font-bold mb-1 ${textColor}`}>
          {isCorrect ? 'Correct Prediction!' : 'Wrong Prediction'}
        </h3>
        
        <div className="flex flex-col gap-2 mt-4 max-w-sm mx-auto">
          <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
            <span className="text-sm text-gray-400">Your Prediction:</span>
            <span className="text-sm font-bold text-white">{getChoiceLabel(prediction.choice)}</span>
          </div>
          <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
            <span className="text-sm text-gray-400">Actual Result:</span>
            <span className="text-sm font-bold text-white">
              {match.homeScore} - {match.awayScore}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // 3. UPCOMING MATCH STATE
  const choices: { value: PredictionChoice; label: string; subLabel: string }[] = [
    { value: 'HOME', label: homeTeam?.name || match.homeTeamPlaceholder || 'Home Team', subLabel: 'Win' },
    { value: 'DRAW', label: 'Draw', subLabel: 'Tie' },
    { value: 'AWAY', label: awayTeam?.name || match.awayTeamPlaceholder || 'Away Team', subLabel: 'Win' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5">
        <Target className="w-32 h-32 text-fifa-gold" />
      </div>

      <div className="text-center mb-6 relative z-10">
        <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
          <Target className="w-5 h-5 text-fifa-gold" />
          Predict Match Result
        </h2>
        <p className="text-sm text-gray-400 mt-1">Select your predicted outcome for this match</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
        {choices.map((c) => {
          const isSelected = prediction?.choice === c.value;
          return (
            <button
              key={c.value}
              onClick={() => handlePredict(c.value)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                isSelected 
                  ? 'bg-fifa-gold/10 border-fifa-gold text-fifa-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className={`text-base font-bold ${isSelected ? 'text-fifa-gold' : 'text-white'}`}>
                {c.label}
              </span>
              <span className={`text-xs ${isSelected ? 'text-fifa-gold/70' : 'text-gray-500'}`}>
                {c.subLabel}
              </span>
              
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="w-4 h-4 text-fifa-gold" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {prediction && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 text-center text-sm text-green-400 flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Prediction saved successfully!
        </motion.div>
      )}
    </motion.div>
  );
}
