import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Match } from '../types';
import { useFixtures } from '../hooks/useFixtures';

export type PredictionChoice = 'HOME' | 'DRAW' | 'AWAY';
export type PredictionStatus = 'CORRECT' | 'WRONG' | 'PENDING';

export interface Prediction {
  matchId: number;
  choice: PredictionChoice;
  timestamp: number;
  status: PredictionStatus;
}

interface PredictionsContextType {
  predictions: Record<number, Prediction>;
  setPrediction: (matchId: number, choice: PredictionChoice) => void;
  clearPredictions: () => void;
}

const PredictionsContext = createContext<PredictionsContextType | undefined>(undefined);

export const PredictionsProvider = ({ children }: { children: ReactNode }) => {
  // Use a new key to avoid conflicts with legacy schema
  const [predictions, setPredictions] = useLocalStorage<Record<number, Prediction>>('fifa-predictions-v2', {});
  const { data: fixtures } = useFixtures();

  // Evaluate predictions against actual results whenever fixtures update
  useEffect(() => {
    if (!fixtures) return;

    let hasChanges = false;
    const newPredictions = { ...predictions };

    Object.values(newPredictions).forEach(pred => {
      if (pred.status !== 'PENDING') return; // Already evaluated

      const match = fixtures.find(m => m.id === pred.matchId);
      if (!match || match.status !== 'finished') return;

      const homeScore = match.homeScore ?? 0;
      const awayScore = match.awayScore ?? 0;

      let actualOutcome: PredictionChoice = 'DRAW';
      if (homeScore > awayScore) actualOutcome = 'HOME';
      else if (awayScore > homeScore) actualOutcome = 'AWAY';

      pred.status = pred.choice === actualOutcome ? 'CORRECT' : 'WRONG';
      hasChanges = true;
    });

    if (hasChanges) {
      setPredictions(newPredictions);
    }
  }, [fixtures, predictions, setPredictions]);

  const setPrediction = (matchId: number, choice: PredictionChoice) => {
    // Prevent updating if match is no longer upcoming (double safety check)
    const match = fixtures?.find(m => m.id === matchId);
    if (match && match.status !== 'upcoming') return;

    setPredictions(prev => ({
      ...prev,
      [matchId]: {
        matchId,
        choice,
        timestamp: Date.now(),
        status: 'PENDING'
      }
    }));
  };

  const clearPredictions = () => setPredictions({});

  return (
    <PredictionsContext.Provider value={{ predictions, setPrediction, clearPredictions }}>
      {children}
    </PredictionsContext.Provider>
  );
};

export const usePredictions = () => {
  const context = useContext(PredictionsContext);
  if (context === undefined) {
    throw new Error('usePredictions must be used within a PredictionsProvider');
  }
  return context;
};
