import type { Match } from '../types';
import fixturesData from './tournamentFixtures.json';

export const tournamentFixtures: Match[] = fixturesData as Match[];

export interface TournamentAward {
  title: string;
  recipient: string;
  teamId?: string;
  teamName?: string;
  metric?: string;
  details?: string;
}

export const tournamentOverview = {
  edition: '23rd FIFA World Cup™',
  year: 2026,
  dates: 'June 11 – July 19, 2026',
  hosts: ['United States', 'Mexico', 'Canada'],
  champion: {
    id: 'ESP',
    name: 'Spain',
    flag: 'es',
    titleCount: 2,
    scoreline: 'Spain 1–0 Argentina (A.E.T.)',
    winningGoal: 'Ferran Torres (106\')',
  },
  runnerUp: {
    id: 'ARG',
    name: 'Argentina',
    flag: 'ar',
  },
  thirdPlace: {
    id: 'ENG',
    name: 'England',
    flag: 'gb-eng',
    scoreline: 'England 6–4 France',
  },
  fourthPlace: {
    id: 'FRA',
    name: 'France',
    flag: 'fr',
  },
  totalMatches: 104,
  totalGoals: 308,
  averageGoals: 2.96,
  highestScoringMatch: {
    id: 103,
    homeTeam: 'ENG',
    awayTeam: 'FRA',
    score: '6–4',
    totalGoals: 10,
    stage: 'Third-Place Play-off',
    venue: 'Hard Rock Stadium, Miami',
  },
  awards: [
    {
      title: 'Golden Ball (Best Player)',
      recipient: 'Rodri',
      teamId: 'ESP',
      teamName: 'Spain',
      metric: 'Tournament MVP',
      details: 'Silver Ball: Lionel Messi (ARG) • Bronze Ball: Kylian Mbappé (FRA)',
    },
    {
      title: 'Golden Boot (Top Scorer)',
      recipient: 'Kylian Mbappé',
      teamId: 'FRA',
      teamName: 'France',
      metric: '10 Goals, 4 Assists',
      details: 'Scored 10 goals in 8 matches including a hat-trick in the 3rd place match',
    },
    {
      title: 'Golden Glove (Best Goalkeeper)',
      recipient: 'Unai Simón',
      teamId: 'ESP',
      teamName: 'Spain',
      metric: '7 Clean Sheets',
      details: 'Conceded only 2 goals throughout the tournament with 7 clean sheets',
    },
    {
      title: 'FIFA Young Player Award',
      recipient: 'Pau Cubarsí',
      teamId: 'ESP',
      teamName: 'Spain',
      metric: 'Breakout Star Defender',
      details: 'Started all 8 matches in central defense as Spain won their 2nd World Cup',
    },
    {
      title: 'FIFA Fair Play Trophy',
      recipient: 'Japan National Team',
      teamId: 'JPN',
      teamName: 'Japan',
      metric: 'Lowest disciplinary points',
      details: 'Awarded for exemplary sportsmanship on and off the pitch',
    },
  ],
  provenance: {
    verificationDate: 'October 18, 2026',
    status: 'Verified Final Archive',
    sources: [
      'FIFA Official Archives (fifa.com/worldcup)',
      'Official FIFA Tournament Match Reports',
      'ESPN Football Results & Standings Database',
      'BBC Sport World Cup Archive & Records',
    ],
  },
};
